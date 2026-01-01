export interface AccountBalance {
  current: number;
  available: number;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: AccountBalance;
  currency: string;
  number: string;
}
