export type BookingTourRequest = {
  bookingTourRequestId: number;
  tourId: number;
  customerId: number;
  requestDate: string;
  requestTimeOut: string;
  startDate: string;
  endDate: string;
  numOfAdult: number;
  numOfChild: number;
  totalPrice: number;
  note: string;
  status: number;
  customer: Customer;
  tour: Tour;
  feedbacks: Feedback[];
};

interface Customer {
  customerId: number;
  accountId: number;
  firstName: string;
  gender: number;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  addressCustomer: string;
  avatarPath: string;
  avatarUploadTime: string;
  balance: number;
  canceledBookingCount: number;
  account: Account;
  bookingTourGuideRequests: BookingTourGuideRequest[];
  bookingTourRequests: string[];
  feedbacks: Feedback[];
  orders: Order[];
}

interface Account {
  accountId: number;
  email: string;
  hashedPassword: string;
  role: number;
  status: number;
  releaseDate: string;
  customer: string;
  tourGuide: TourGuide;
  paymentRequests: PaymentRequest[];
  refreshTokens: RefreshToken[];
}

interface TourGuide {
  tourGuideId: number;
  accountId: number;
  cityId: number;
  firstName: string;
  lastName: string;
  description: string;
  dateOfBirth: string;
  gender: number;
  phoneNumber: string;
  address: string;
  zaloLink: string;
  facebookLink: string;
  instagramLink: string;
  pricePerDay: number;
  status: number;
  avatarPath: string;
  avatarUploadDate: string;
  coverPath: string;
  coverUploadDate: string;
  balance: number;
  rejectedBookingCount: number;
  account: string;
  city: City;
  bookingTourGuideRequests: string[];
  feedbacks: string[];
  tours: string[];
}

interface City {
  cityId: number;
  name: string;
  cityDescription: string;
  cityBanner: string;
  cityThumbnail: string;
  cityBannerUploadDate: string;
  cityThumbnailUploadDate: string;
  status: boolean;
  tourGuides: string[];
  tours: string[];
}

interface PaymentRequest {
  paymentId: number;
  accountId: number;
  amount: number;
  type: number;
  transactionCode: string;
  bankAccount: string;
  bank: string;
  requestDate: string;
  status: number;
  account: string;
}

interface RefreshToken {
  refreshTokenId: number;
  accountId: number;
  token: string;
  deviceName: string;
  expiredDate: string;
  status: boolean;
  account: string;
}

interface BookingTourGuideRequest {
  bookingTourGuideRequestId: number;
  tourGuideId: number;
  customerId: number;
  requestDate: string;
  requestTimeOut: string;
  startDate: string;
  endDate: string;
  numOfAdult: number;
  numOfChild: number;
  totalPrice: number;
  note: string;
  status: number;
  customer: string;
  tourGuide: TourGuide;
  feedbacks: string[];
  orders: string[];
}

interface Feedback {
  feedbackId: number;
  customerId: number;
  tourGuideId: number;
  bookingTourRequestsId: number;
  bookingTourGuideRequestId: number;
  numOfStars: number;
  content: string;
  timeFeedback: string;
  status: boolean;
  bookingTourGuideRequest: BookingTourGuideRequest;
  bookingTourRequests: string;
  customer: string;
  tourGuide: TourGuide;
  feedbackImages: FeedbackImage[];
}

interface FeedbackImage {
  feedbackImageId: number;
  feedbackId: number;
  imagePath: string;
  uploadDate: string;
  feedback: string;
}

interface Order {
  orderId: number;
  customerId: number;
  bookingTourRequestsId: number;
  bookingTourGuideRequestId: number;
  orderCode: string;
  orderPrice: number;
  paymentProvider: string;
  transactionCode: string;
  status: number;
  createAt: string;
  bookingTourGuideRequest: BookingTourGuideRequest;
  bookingTourRequests: string;
  customer: string;
}

interface Tour {
  tourId: number;
  cityId: number;
  tourGuideId: number;
  name: string;
  description: string;
  category: string;
  activity: string;
  duration: number;
  status: number;
  city: City;
  tourGuide: TourGuide;
  bookingTourRequests: string[];
  tourExcludes: TourExclude[];
  tourHighlights: TourHighlight[];
  tourImages: TourImage[];
  tourIncludes: TourInclude[];
  tourItineraries: TourItinerary[];
  tourPrices: TourPrice[];
  tourTypes: TourType[];
}

interface TourExclude {
  excludeId: number;
  tourId: number;
  excludeDetail: string;
  tour: string;
}

interface TourHighlight {
  highlightId: number;
  tourId: number;
  highlightDetail: string;
  tour: string;
}

interface TourImage {
  imageId: number;
  tourId: number;
  imagePath: string;
  caption: string;
  uploadDate: string;
  tour: string;
}

interface TourInclude {
  includeId: number;
  tourId: number;
  includeDetail: string;
  tour: string;
}

interface TourItinerary {
  itineraryId: number;
  tourId: number;
  name: string;
  description: string;
  tour: string;
}

interface TourPrice {
  tourPriceId: number;
  tourId: number;
  totalTouristFrom: number;
  totalTouristTo: number;
  adultPrice: number;
  childPrice: number;
  tour: string;
}

interface TourType {
  typeId: number;
  tourId: number;
  typeDetail: string;
  tour: string;
}
