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
  page: 1,
  hasMore: true,
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

        const { engineer, workSummary, completedWorks, pagination, page } = action.payload;

        if (page === 1) {
          state.engineer = engineer;
          state.workSummary = workSummary;
          state.completedWorks = completedWorks;
        } else {
          state.completedWorks.push(...completedWorks);
        }

        state.page = pagination.currentPage;
        state.hasMore = pagination.currentPage < pagination.totalPages;
      })
      .addCase(engineerMyPageThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default engineerMyPageSlice.reducer;
