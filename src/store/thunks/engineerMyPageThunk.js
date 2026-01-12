import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const engineerMyPageThunk = createAsyncThunk(
  "engineerMyPage/engineerMyPageThunk",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/engineers/me/mypage", {
        params: {page},
      });

      return {
        ...res.data.data,
        page,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
