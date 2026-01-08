import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reservationDetailSlice from "./slices/reservationDetail.slice.js";
import engineerDashboardReducer from "./slices/engineerDashboardSlice.js";
import engineerReservationReducer from './slices/engineerReservationSlice.js';
import { injectStoreInAxios } from "../api/axiosInstance.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservationDetail: reservationDetailSlice,
    engineerDashboard: engineerDashboardReducer,
    engineerReservation: engineerReservationReducer,
  },
});

injectStoreInAxios(store);