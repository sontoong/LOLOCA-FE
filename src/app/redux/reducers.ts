import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import customerReducer from "./slice/customerSlice";
import tourguideReducer from "./slice/tourguideSlice";
import tourReducer from "./slice/tourSlice";
import cityReducer from "./slice/citySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  tourguide: tourguideReducer,
  tour: tourReducer,
  city: cityReducer,
});

export default rootReducer;
