import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";

export const verifyAuthTokenStore = createAsyncThunk(
  "account/verifyAuthToken",
  async () => await axios.post("/verify")
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
  },
});

export const { signinStore, logoutStore } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
