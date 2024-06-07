import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import customerReducer from "./slice/customerSlice";
import tourguideReducer from "./slice/tourguideSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  tourguide: tourguideReducer,
});

export default rootReducer;
