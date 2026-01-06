import { createSlice } from "@reduxjs/toolkit";
import { fetchEngineerDashboard } from "../thunks/engineerDashboardThunk.js";

const initialState = {
  engineerName: null,
  todayCount: 0,
  monthCount: 0,
  status: "idle",
  error: null,
};

const engineerDashboardSlice = createSlice({
  name: "engineerDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineerDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEngineerDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.engineerName = action.payload.engineer.name;
        state.todayCount = action.payload.todayReservationCount;
        state.monthCount = action.payload.monthlyReservationCount;
      })
      .addCase(fetchEngineerDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default engineerDashboardSlice.reducer;
