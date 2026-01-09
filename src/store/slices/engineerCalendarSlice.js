import { createSlice } from "@reduxjs/toolkit";
import { engineerCalendarThunk } from "../thunks/engineerCalendarThunk.js";

const engineerCalendarSlice = createSlice({
  name: "engineerCalendar",
  initialState: {
    calendarData: {}, // 백엔드의 days 객체가 저장됨
    totalCount: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(engineerCalendarThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(engineerCalendarThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 백엔드 구조: action.payload.data = { year, month, totalCount, days }
        state.calendarData = action.payload.data.days;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(engineerCalendarThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default engineerCalendarSlice.reducer;