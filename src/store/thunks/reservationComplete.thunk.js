import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const reservationCompleteThunk = createAsyncThunk(
  "reservationComplete/reservationCompleteThunk",
  async (reservationId, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/engineers/me/reservations/${reservationId}/complete`
      );
      return res.data.data; // { message: "WORK_COMPLETED" }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
