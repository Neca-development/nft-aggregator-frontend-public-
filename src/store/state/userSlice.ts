import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserSlice {
  wallet: string;
  hasSubscription: boolean;
  subscriptionExpireDate: string;
  transactionState: "pending" | "none";
}

// TEMP
const initialState: IUserSlice = {
  wallet: null,
  hasSubscription: false,
  subscriptionExpireDate: null,
  transactionState: "none",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
  },
});

export const { setWallet } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
