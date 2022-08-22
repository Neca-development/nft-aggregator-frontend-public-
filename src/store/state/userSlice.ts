import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISubscriptionState, TransactionState } from "@models/payment.interface";
import { paymentApi } from "@services/payment.api";

import { RootState } from "../store";

interface IUserSlice extends ISubscriptionState {
  isLoggedIn: boolean;
}

const initialState: IUserSlice = {
  isLoggedIn: false,
  active: false,
  expiresAt: "",
  isNewUser: true,
  transactionState: TransactionState.success,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: state => {
      state.isLoggedIn = true;
    },
    setLoggedOut: state => {
      state.isLoggedIn = false;
    },
    clearUserState: () => {
      return initialState;
    },
    setTransactionStatus: (state, action: PayloadAction<TransactionState>) => {
      state.transactionState = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      // write subscription status in the store
      paymentApi.endpoints.getSubscriptionState.matchFulfilled,
      (state, { payload }) => {
        state.active = payload.active;
        state.expiresAt = payload.expiresAt;
        state.isNewUser = payload.isNewUser;
        state.transactionState = payload.transactionState;

        state.isLoggedIn = true;
      }
    );
  },
});

export const { clearUserState, setLoggedIn, setLoggedOut, setTransactionStatus } =
  userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
