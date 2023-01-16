import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyAccount } from "features/account";
import Cookies from "js-cookie";

export const verifyAuthTokenStore = createAsyncThunk(
  "account/verifyAuthToken",
  async () => {
    if (!!Cookies.get("authToken")) {
      const response = await verifyAccount();
      return response.data;
    }
  }
);

const initialState = {
  username: null,
  authorized: false,
  loaded: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signinStore: (state, { payload }) => {
      state.authorized = true;

      Cookies.set("authToken", payload);
    },
    _setLoaded: (state) => {
      state.loaded = true;
    },
    _setAccount: (state, { payload }) => {
      if (!!payload?.username) {
        state.username = payload.username;
        state.authorized = true;
      }

      state.loaded = true;
    },
    logoutStore: () => {
      Cookies.remove("authToken");

      return {
        ...initialState,
        loaded: true,
      };
    },
  },
  extraReducers: {
    [verifyAuthTokenStore.fulfilled]: (state, action) => {
      accountSlice.caseReducers._setAccount(state, action);
    },
    [verifyAuthTokenStore.rejected]: (state) => {
      accountSlice.caseReducers._setLoaded(state);
    },
  },
});

export const { signinStore, logoutStore } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
