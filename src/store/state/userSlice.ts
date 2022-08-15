import { ISubscriptionState } from "@models/payment.interface";
import { createSlice } from "@reduxjs/toolkit";
import { paymentApi } from "@services/payment.api";
import { RootState } from "../store";

interface IUserSlice extends ISubscriptionState {
  isLoggedIn: boolean;
}

const initialState: IUserSlice = {
  isLoggedIn: false,
  active: false,
  expiresAt: "",
  newUser: true,
  transactionState: "none",
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
  },
  extraReducers: builder => {
    builder.addMatcher(
      // write subscription status in the store
      paymentApi.endpoints.getSubscriptionState.matchFulfilled,
      (state, { payload }) => {
        state.active = payload.active;
        state.expiresAt = payload.expiresAt;
        state.newUser = payload.newUser;
        state.transactionState = payload.transactionState;
      }
    );
  },
});

export const { clearUserState, setLoggedIn, setLoggedOut } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
