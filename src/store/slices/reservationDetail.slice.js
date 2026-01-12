import { createSlice } from "@reduxjs/toolkit"; 
import dayjs from "dayjs";
// **[수정] Thunk의 T를 대문자로 (thunk 파일에서 내보낸 이름과 동일하게)**
import { reservationDetailThunk } from "../thunks/reservationDetail.thunk.js"; 

const initialState = {
   // **[수정] 상세 페이지는 객체(null)로 관리하는 것이 데이터 접근에 용이합니다.**
   reservationDetailData: null, 
   date: dayjs().format('YYYY-MM-DD'),
   isLoading: false, // status 대신 isLoading으로 관리하면 더 직관적입니다 (선택사항)
   status: "idle",
   error: null,
};

const slice = createSlice({
  name: 'reservationDetail',
  initialState,
  reducers: {
    clearReservationDetail(state) {
      // **[수정] 초기화 시 객체를 null로**
      state.reservationDetailData = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // **[수정] 대소문자 일치: reservationDetailThunk**
      .addCase(reservationDetailThunk.pending, (state) => {
         state.status = "loading";
         state.isLoading = true;
      })      
      .addCase(reservationDetailThunk.fulfilled, (state, action) => {
         state.status = "succeeded";
         state.isLoading = false;

         // **[핵심 수정] 상세 데이터 저장 로직**
         // 이미지 JSON 구조가 { data: { reservation: { ... } } } 라면:
         state.reservationDetailData = action.payload; 
         // 만약 payload가 { data: { reservation } } 전체라면 
         // state.reservationDetailData = action.payload.data.reservation;
      })      
      .addCase(reservationDetailThunk.rejected, (state, action) => {
         state.status = "failed";
         state.isLoading = false;
         state.error = action.payload; 
      });
  }
});

export const { clearReservationDetail } = slice.actions;
export default slice.reducer;