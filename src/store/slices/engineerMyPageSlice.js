import { createSlice } from "@reduxjs/toolkit";
import { engineerMyPageThunk } from "../thunks/engineerMyPageThunk.js";

const initialState = {
  engineer: null,
  workSummary: {
    todayCount: 0,
    totalCount: 0,
  },
  completedWorks: [],
  status: "idle",
  error: null,
};

const engineerMyPageSlice = createSlice({
  name: "engineerMyPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(engineerMyPageThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(engineerMyPageThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.engineer = action.payload.engineer;
        state.workSummary = action.payload.workSummary;
        state.completedWorks = action.payload.completedWorks;
      })
      .addCase(engineerMyPageThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default engineerMyPageSlice.reducer;
