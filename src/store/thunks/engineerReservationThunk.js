import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const engineerReservationThunk = createAsyncThunk(
  "engineerReservation/engineerReservationThunk",
  async (arg, { rejectWithValue, getState }) => {
    try {
      const { engineerReservation } = getState();

      // 인자로 받은 date가 있으면 우선 사용, 없으면 Redux state의 date 사용
      // (페이지네이션 클릭 시에는 arg가 없으므로 state 값을 유지하게 됨)
      const targetDate = arg?.date || engineerReservation.date;

      const params = {
        page: engineerReservation.page + 1,
        limit: engineerReservation.limit,
        date: targetDate, // 결정된 날짜 파라미터 적용
      };
      
      const res = await api.get("/api/engineers/me/reservations", { params });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);