import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "./operations";

type AuthType = {
  user: { name: string | null; email: string | null; avatarURL: string | null };
  token: string | null;
  isLoggedIn: boolean;
};

const initialState = {
  user: { name: null, email: null, avatarURL: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthType,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(authAPI.endpoints.login.matchPending, () => {})
      .addMatcher(
        authAPI.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authAPI.endpoints.login.matchRejected, () => {})
      .addMatcher(authAPI.endpoints.register.matchPending, () => {})
      .addMatcher(
        authAPI.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authAPI.endpoints.register.matchRejected, () => {})
      .addMatcher(authAPI.endpoints.getUser.matchPending, () => {})
      .addMatcher(
        authAPI.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.isLoggedIn = true;
          state.user = payload;
        }
      )
      .addMatcher(authAPI.endpoints.getUser.matchRejected, () => {})
      .addMatcher(authAPI.endpoints.logout.matchPending, () => {})
      .addMatcher(authAPI.endpoints.logout.matchFulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = initialState.user;
        state.token = null;
      })
      .addMatcher(authAPI.endpoints.logout.matchRejected, () => {}),
});

export const authReducer = authSlice.reducer;
