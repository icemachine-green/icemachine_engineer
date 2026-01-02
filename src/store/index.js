import { configureStore } from "@reduxjs/toolkit";
import reservationDetailSlice from "./slices/reservationDetail.slice.js";

export default configureStore({
  reducer: {
    reservationDetail: reservationDetailSlice,
  },
});