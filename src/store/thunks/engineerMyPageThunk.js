import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const engineerMyPageThunk = createAsyncThunk(
  "engineerMyPage/engineerMyPageThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/engineers/me/mypage");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
