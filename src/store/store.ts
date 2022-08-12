import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { baseApi } from "@services/base.api";
import filterSlice from "./state/filterSlice";
import userSlice from "./state/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    filterRequest: filterSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
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
