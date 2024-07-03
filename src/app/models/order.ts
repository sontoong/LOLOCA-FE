export type Order = {
  customerId: number;
  bookingTourRequestsId: number;
  bookingTourGuideRequestId: number;
  orderCode: string;
  orderPrice: number;
  paymentProvider: string;
  transactionCode: string;
  status: number;
  createAt: string;
};
