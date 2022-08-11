export interface ISubscriptionState {
  active: boolean;
  expiresAt?: string;
  transactionState?: "none" | "pending" | "success" | "failed";
  newUser: boolean;
}
