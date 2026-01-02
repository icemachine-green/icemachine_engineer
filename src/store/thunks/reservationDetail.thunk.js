import { createAsyncThunk } from "@reduxjs/toolkit";
import { reservationsDummy } from '../../data/reservationsDummy.js'; // TODO: 더미데이터 이므로 Axios 추가 후 삭제

// TODO: Axios 추가 필요

// 리스트 획득 Thunk 생성 및 내보내기
export const detailThunk = createAsyncThunk(
  "reservationDetail/detailThunk",
  async(id) => {
    // TODO: AJAX 처리추가 필요, 서버에 특정 API 호출

		return reservationsDummy.find(item => item.id == id);
  }
);