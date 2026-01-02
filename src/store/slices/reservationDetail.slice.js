import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit의 createSlice 함수 임포트
import { detailThunk } from "../thunks/reservationDetail.thunk.js";

const initialState = {
	reservationDetailData: null,
};

// `counter` 상태 관리 Slice 생성
const slice = createSlice({
  name: 'reservationDetail',
  initialState,
  reducers: {
    clearReservationDetail(state) {
      state.reservationDetailData = null;
    }
  },
	extraReducers: builder => {
		builder.addCase(detailThunk.fulfilled, (state, action) => {
			state.reservationDetailData = action.payload;
		});
	}
});

export const {
	clearReservationDetail
} = slice.actions;

export default slice.reducer;