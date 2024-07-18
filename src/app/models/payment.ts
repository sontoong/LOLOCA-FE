export type Deposit = {
  paymentId: string;
  accountId: string;
  email: string;
  amount: number;
  transactionCode: string;
  requestDate: string;
  status: number;
};

export type DepositList = Deposit[];
