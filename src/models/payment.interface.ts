export interface ISubscriptionState {
  active: boolean;
  expiresAt: string;
  transactionState: "none" | "pending";
  newUser: boolean;
}
