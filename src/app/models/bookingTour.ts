export type BookingTourRequest = {
  bookingTourRequestId: number;
  tourId: number;
  tourName: string;
  customerId: number;
  requestDate: string; // ISO 8601 format date string
  requestTimeOut: string; // ISO 8601 format date string
  startDate: string; // ISO 8601 format date string
  endDate: string; // ISO 8601 format date string
  numOfAdult: number;
  numOfChild: number;
  totalPrice: number;
  note: string;
  status: number;
};
