import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const engineerCalendarThunk = createAsyncThunk(
  "engineer/calendar",
  async ({ year, month }, thunkAPI) => {
    try {
      // axios 요청 (직접 Authorization 헤더 주입)
      const response = await axiosInstance.get(`/api/engineers/me/calendar`, {
        params: { month, year }
      });

      // 3. 백엔드 응답의 전체 데이터 반환 ({ code, msg, data })
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "데이터를 불러오지 못했습니다.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);