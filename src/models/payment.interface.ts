export interface ISubscriptionState {
  active: boolean;
  expiresAt?: string;
  transactionState?: TransactionState;
  isNewUser: boolean;
}

export type TransactionState = "none" | "pending" | "success" | "failed";
