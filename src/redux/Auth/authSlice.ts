import { createSlice } from "@reduxjs/toolkit";
import { api } from "./operations";

type AuthType = {
  user: { name: string | null; email: string | null };
  token: string | null;
  isLoggedIn: boolean;
};

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthType,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(api.endpoints.login.matchPending, () => {})
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addMatcher(api.endpoints.login.matchRejected, () => {})
      .addMatcher(api.endpoints.register.matchPending, () => {})
      .addMatcher(
        api.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(api.endpoints.register.matchRejected, () => {})
      .addMatcher(api.endpoints.getUser.matchPending, () => {})
      .addMatcher(
        api.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.isLoggedIn = true;
          state.user = payload;
        }
      )
      .addMatcher(api.endpoints.getUser.matchRejected, () => {})
      .addMatcher(api.endpoints.logout.matchPending, () => {})
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = initialState.user;
        state.token = null;
      })
      .addMatcher(api.endpoints.logout.matchRejected, () => {}),
});

export const authReducer = authSlice.reducer;
