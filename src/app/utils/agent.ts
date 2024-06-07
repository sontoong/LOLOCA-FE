import { AxiosResponse } from "axios";

import apiJWT from "./api";
import baseApi from "./baseApi";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  patch: <T>(url: string, body: T) =>
    apiJWT.patch(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, { params }).then(responseBody),
};

const baseRequests = {
  get: <T>(url: string, params?: T) =>
    baseApi.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => baseApi.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => baseApi.put(url, body).then(responseBody),
  patch: <T>(url: string, body: T) =>
    baseApi.patch(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    baseApi.delete(url, { params }).then(responseBody),
};

//base APIs
const _authBase = "Authenticate";
const Auth = {
  // auth
  login: (data: any) => baseRequests.post(`${_authBase}/auth`, data),
  authVerify: (data: any) =>
    baseRequests.post(`${_authBase}/auth/verify`, data),
  refreshToken: (data: any) =>
    baseRequests.post(`${_authBase}/auth/refresh`, data),
  forgetPassword: (data: any) =>
    baseRequests.post(`${_authBase}/auth/forget-password`, data),
  forgetPasswordVerify: (data: any) =>
    baseRequests.post(`${_authBase}/auth/forget-password/verify`, data),
  forgetPasswordNewpassword: (data: any) =>
    baseRequests.post(`${_authBase}/auth/forget-password/new-password`, data),
  // register
  registerCustomer: (data: any) =>
    baseRequests.post(`${_authBase}/register/customer`, data),
  registerTourguide: (data: any) =>
    baseRequests.post(`${_authBase}/register/tourguide`, data),
  registerVerify: (data: any) =>
    baseRequests.post(`${_authBase}/register/verify`, data),
};

//APIs
const _bookingTour = "BookingTour";
const BookingTour = {
  createBookingTour: (data: any) =>
    requests.post(`${_bookingTour}/create-booking-tour-request`, data),
  getAllBookingTour: () =>
    requests.get(`${_bookingTour}/get-all-booking-tour-reuqest`),
  getBookingTourById: (param: any) => requests.get(`${_bookingTour}/${param}`),
  getBookingTourByCustomerId: (param: any) =>
    requests.get(`${_bookingTour}/customer/${param}`),
  getBookingTourByTourguideId: (param: any) =>
    requests.get(`${_bookingTour}/tourguide/${param}`),
};

const _bookingTourGuideRequest = "BookingTourGuideRequest";
const BookingTourGuideRequest = {
  createBookingTourGuide: (data: any) =>
    requests.post(`${_bookingTourGuideRequest}/create-booking-tourguide`, data),
  getAllBookingTourGuide: () =>
    requests.get(`${_bookingTourGuideRequest}/get-all-bookingtourguide`),
  getBookingTourGuideById: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/${param}`),
  getBookingTourGuideByCustomerId: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/customer/${param}`),
  getBookingTourGuideByTourguideId: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/tourguide/${param}`),
};

const _cities = "Cities";
const Cities = {
  getCities: () => requests.get(`${_cities}`),
  addNewCity: (data: any) => requests.post(`${_cities}`, data),
  getCityById: (param: any) => requests.get(`${_cities}/${param}`),
  updateCityById: (param: any, data: any) =>
    requests.put(`${_cities}/${param}`, data),
  deleteCityById: (param: any) => requests.del(`${_cities}/${param}`),
};

const _customer = "Customer";
const Customer = {
  updateInfo: (data: any) => requests.post(`${_customer}/update-info`, data),
  changePassword: (data: any) =>
    requests.post(`${_customer}/change-password`, data),
  updateAvatar: (data: any) =>
    requests.post(`${_customer}/update-avatar`, data),
  getAllCustomer: () => requests.get(`${_customer}`),
  getCustomerById: (params: any) => requests.get(`${_customer}/${params}`),
  getPrivate: () => requests.get(`${_customer}/private`),
  changeStatusBookingTourGuide: (params: any, data: any) =>
    requests.post(
      `${_customer}/change-status-booking-tour-guide/${params}`,
      data
    ),
  changeStatusBookingTour: (params: any, data: any) =>
    requests.post(`${_customer}/change-status-booking-tour/${params}`, data),
};

const agent = {
  Auth,
  BookingTour,
  BookingTourGuideRequest,
  Cities,
  Customer,
};
export default agent;
