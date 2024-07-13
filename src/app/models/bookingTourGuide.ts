export type BookingTourGuideRequest = {
  bookingTourGuideRequestId: string;
  tourGuideId: string;
  customerId: string;
  tourGuideName: string;
  requestDate: string; // ISO 8601 format
  requestTimeOut: string; // ISO 8601 format
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  numOfAdult: number;
  numOfChild: number;
  totalPrice: number;
  note: string;
  status: number;
};
