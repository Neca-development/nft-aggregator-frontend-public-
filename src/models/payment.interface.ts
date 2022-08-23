export interface ISubscriptionState {
  active: boolean;
  expiresAt?: string;
  transactionState?: TransactionState;
  isNewUser: boolean;
}

export enum TransactionState {
  failed = 0,
  success = 1,
  pending = 2,
  null = 3,
}
