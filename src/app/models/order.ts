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

export type OrderList = Order[];

export type RequestTour = { id: string; type: "tour" | "tourGuide" };
