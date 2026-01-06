import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const fetchEngineerDashboard = createAsyncThunk(
  "engineerDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/engineers/me/dashboard");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
