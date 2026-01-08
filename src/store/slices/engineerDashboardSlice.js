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

        const data = action.payload.data;
        state.engineerName = data.engineer.name;
        state.todayCount = data.todayReservationCount;
        state.monthCount = data.monthlyReservationCount;
      })
      .addCase(fetchEngineerDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default engineerDashboardSlice.reducer;
