export type Feedback = {
  feedbackId: number;
  customerId: number;
  tourGuideId: number;
  bookingTourRequestsId?: number;
  bookingTourGuideRequestId?: number;
  numOfStars: number;
  content: string;
  timeFeedback: string;
  status: boolean;
  feedBackImgViewList: string[];
};

export type FeedbackList = Feedback[];
