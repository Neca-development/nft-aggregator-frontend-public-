import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "./state/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
