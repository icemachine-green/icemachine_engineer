import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { engineerReservationThunk } from "../thunks/engineerReservationThunk.js";

const initialState = {
  reservations: [],
  page: 0,
  isLasted: false,
  limit: 3,
  totalCount: 0,
  date: dayjs().format('YYYY-MM-DD'),
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "engineerReservation",
  initialState,
  reducers: {
    clearEngineerReservation(state) {
      state.reservations = [];
      state.page = 0;
      state.isLasted = false;
      state.limit = 3;
      state.totalCount = 0;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(engineerReservationThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(engineerReservationThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { reservations, page, total } = action.payload.data;
        if (page === 1) {
          // 목록 최초 진입 / 상세 → 목록 복귀
          state.reservations = reservations;
        } else {
          // "예약 더 보기"
          state.reservations.push(...reservations);
        }

        state.page = page;
        state.totalCount = total;
        state.isLasted = page >= Math.ceil(total / state.limit);
      })
      .addCase(engineerReservationThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  clearEngineerReservation,
} = slice.actions;

export default slice.reducer;
