import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const reservationStartThunk = createAsyncThunk(
  "reservationStart/reservationStartThunk",
  async (reservationId, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/engineers/me/reservations/${reservationId}/start`
      );
      return res.data.data; // { message: "WORK_STARTED" }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
