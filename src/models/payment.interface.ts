export interface ISubscriptionState {
  active: boolean;
  expiresAt?: string;
  transactionState?: TransactionState;
  isNewUser: boolean;
}

export enum TransactionState {
  failed = 0,
  success = 1,
  unknown = 2,
  pending = 3,
}
