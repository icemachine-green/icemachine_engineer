import { createSlice } from "@reduxjs/toolkit";
import {
  reissueThunk,
  startKakaoLoginThunk,
  socialSignupThunk,
  logoutThunk,
} from "../thunks/authThunk.js";

const initialState = {
  isLoggedIn: false,
  isInitializing: true, // 앱 초기 인증 상태
  user: null,
  accessToken: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'

  // 소셜 로그인 임시 정보
  provider: null,
  socialId: null,

  error: null, // 에러 상태는 유지하는 것이 좋을 수 있습니다.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * callback 페이지에서 소셜 정보 저장용
     */
    setSocialAuthInfo: (state, action) => {
      const { provider, socialId } = action.payload;
      state.provider = provider;
      state.socialId = socialId;
    },
    clearAuthState: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.user = null;
      state.provider = null;
      state.socialId = null;
      state.error = null;
      state.status = "idle";
      state.isInitializing = false; // 초기화 시 false로 설정
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reissueThunk.pending, (state) => {
        state.isInitializing = true;
        state.status = "loading";
      })
      .addCase(reissueThunk.fulfilled, (state, action) => {
        state.isInitializing = false;
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        console.log(action.payload);
      })
      .addCase(reissueThunk.rejected, (state, action) => {
        state.isInitializing = false;
        state.status = "failed";
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload;
      })
      // 카카오 로그인 시작
      .addCase(startKakaoLoginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(startKakaoLoginThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(startKakaoLoginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 소셜 회원가입
      .addCase(socialSignupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(socialSignupThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.isInitializing = false;
        state.user = action.payload.data.user || null;
        state.accessToken = action.payload.data.accessToken || null;
      })
      .addCase(socialSignupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.user = null;
        state.provider = null;
        state.socialId = null;
        state.error = null;
        state.status = "idle";
        state.isInitializing = false; // 초기화 시 false로 설정
      })
      ;
  },
});

export const { logout, setSocialAuthInfo, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
