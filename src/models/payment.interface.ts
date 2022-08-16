export interface ISubscriptionState {
  active: boolean;
  expiresAt?: string;
  transactionState?: TransactionState;
  isNewUser: boolean;
}

export enum TransactionState {
  none = "none",
  pending = "pending",
  success = "success",
  failed = "failed",
}
