import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

// **함수 이름을 컴포넌트에서 부르는 이름과 통일하거나, 컴포넌트의 import를 수정해야 함**
export const reservationDetailThunk = createAsyncThunk(
  "ReservationDetail/fetchDetail",
  // **상세 페이지이므로 id를 인자로 받습니다.**
  async (id, { rejectWithValue }) => {
    try {
      // **API 엔드포인트가 리스트(_list)가 아닌 상세 내역 주소인지 확인하세요.**
      // 보통 상세 조회는 /api/engineers/me/reservations/${id} 형태입니다.
      const res = await api.get(`/api/engineers/me/reservations/${id}`);

      // 이미지 JSON 구조를 보면 res.data.data.reservation 순으로 들어있을 수 있으므로 
      // 리턴 값을 확인하여 필요한 객체만 넘겨주는 것이 좋습니다.
      return res.data.data.reservation; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);