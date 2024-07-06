import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import customerReducer from "./slice/customerSlice";
import tourguideReducer from "./slice/tourguideSlice";
import tourReducer from "./slice/tourSlice";
import cityReducer from "./slice/citySlice";
import feedbackReducer from "./slice/feedbackSlice";
import bookingTourReducer from "./slice/bookingTourSlice";
import orderReducer from "./slice/orderSlice";
import uiReducer from "./slice/uiSlice";
import bookingTourGuideReducer from "./slice/bookingTourGuideSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  tourguide: tourguideReducer,
  tour: tourReducer,
  city: cityReducer,
  feedback: feedbackReducer,
  order: orderReducer,
  ui: uiReducer,
  bookingTour: bookingTourReducer,
  bookingTourGuide: bookingTourGuideReducer,
});

export default rootReducer;
