export interface TransactionMerchant {
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  value_date: string;
  type: 'INFLOW' | 'OUTFLOW';
  category: string;
  merchant?: TransactionMerchant;
}
