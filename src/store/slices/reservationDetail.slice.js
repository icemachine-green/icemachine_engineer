import { createSlice } from "@reduxjs/toolkit"; 
import { detailThunk } from "../thunks/reservationDetail.thunk.js";

const initialState = {
  reservationDetailData: null,
  isLoading: false, // 로딩 상태 추가
};

const slice = createSlice({
  name: 'reservationDetail',
  initialState,
  reducers: {
    clearReservationDetail(state) {
      state.reservationDetailData = null;
      state.isLoading = false;
    }
  },
  extraReducers: builder => {
    builder
      // 1. 데이터 요청이 시작되었을 때 (Pending)
      .addCase(detailThunk.pending, (state) => {
        state.isLoading = true;
      })
      // 2. 데이터 요청이 성공했을 때 (Fulfilled)
      .addCase(detailThunk.fulfilled, (state, action) => {
        state.isLoading = false; // 로딩 종료
        state.reservationDetailData = action.payload;
      })
      // 3. 데이터 요청이 실패했을 때 (Rejected)
      .addCase(detailThunk.rejected, (state) => {
        state.isLoading = false; // 에러가 나도 로딩은 멈춰야 함
      });
  }
});

export const {
  clearReservationDetail
} = slice.actions;

export default slice.reducer;