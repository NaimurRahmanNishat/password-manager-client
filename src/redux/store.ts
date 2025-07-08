// src/redux/store.ts (or src/redux/extra.ts)

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { sheetApi } from "./features/sheet/sheetApi";

// 👉 Configure the store
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [sheetApi.reducerPath]: sheetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, sheetApi.middleware),
});

// ✅ Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Export the store
export default store;
