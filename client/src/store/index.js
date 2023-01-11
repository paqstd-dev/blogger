import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { accountReducer } from "features/account";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
