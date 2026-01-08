import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

export const engineerReservationThunk = createAsyncThunk(
  "engineerReservation/engineerReservationThunk",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { engineerReservation } = getState();

      const params = {
        page: engineerReservation.page + 1,
        limit: engineerReservation.limit,
        date: engineerReservation.date,
      }
      
      const res = await api.get("/api/engineers/me/reservations", { params });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
