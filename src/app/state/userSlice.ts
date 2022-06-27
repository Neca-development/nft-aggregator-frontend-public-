import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  wallet: string;
  hasSubscription: boolean;
  subscriptionExpireDate: string;
  transactionState: "pending" | "none";
}

// TEMP
const initialState: IUserSlice = {
  wallet: "0x704035F11135E6eEa91B122E87D6a2AC31a9bd78",
  hasSubscription: false,
  subscriptionExpireDate: "2022-07-15T15:27:05.208Z",
  transactionState: "none",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
