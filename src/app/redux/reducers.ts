import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import customerReducer from "./slice/customerSlice";
import tourguideReducer from "./slice/tourguideSlice";
import tourReducer from "./slice/tourSlice";
import cityReducer from "./slice/citySlice";
import feedbackReducer from "./slice/feedbackSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  tourguide: tourguideReducer,
  tour: tourReducer,
  city: cityReducer,
  feedback: feedbackReducer,
});

export default rootReducer;
