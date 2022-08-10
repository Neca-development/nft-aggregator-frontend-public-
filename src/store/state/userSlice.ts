import { ISubscriptionState } from "@models/payment.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { paymentApi } from "@services/payment.api";
import { RootState } from "../store";

interface IUserSlice extends ISubscriptionState {
  wallet: string;
  signature: string;
}

const initialState: IUserSlice = {
  wallet: null,
  signature: null,
  active: false,
  expiresAt: "",
  newUser: true,
  transactionState: "none",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
    setSignature: (state, action: PayloadAction<string>) => {
      state.signature = action.payload;
    },
    clearUserState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      // write subscription state to store
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

export const { setWallet, setSignature, clearUserState } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
