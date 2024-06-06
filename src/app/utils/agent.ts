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
const _authBase = "v1/auth";
const Auth = {
  login: (data: any) => baseRequests.post(`${_authBase}`, data),
  verify: (data: any) => baseRequests.post(`${_authBase}/verify`, data),
  refreshToken: (data: any) => baseRequests.post(`${_authBase}/refresh`, data),
  forgetPassword: (data: any) =>
    baseRequests.post(`${_authBase}/forget-password`, data),
  forgetPasswordVerify: (data: any) =>
    baseRequests.post(`${_authBase}/forget-password/verify`, data),
  forgetPasswordNewpassword: (data: any) =>
    baseRequests.post(`${_authBase}/forget-password/new-password`, data),
};

const _registerBase = "v1/register";
const Register = {
  registerCustomer: (data: any) =>
    baseRequests.post(`${_registerBase}/customer`, data),
  registerTourguide: (data: any) =>
    baseRequests.post(`${_registerBase}/tourguide`, data),
  verify: (data: any) => baseRequests.post(`${_registerBase}/verify`, data),
};

//APIs
const _bookingTour = "BookingTour";
const BookingTour = {
  bookingTour: (data: any) => requests.post(`${_bookingTour}`, data),
  getBookingTour: () => requests.get(`${_bookingTour}`),
  getBookingTourDetail: (param: any) =>
    requests.get(`${_bookingTour}/${param}`),
  getBookingTourCustomer: (param: any) =>
    requests.get(`${_bookingTour}/customer/${param}`),
  getBookingTourTourguide: (param: any) =>
    requests.get(`${_bookingTour}/tourguide/${param}`),
};

const _bookingTourGuideRequest = "BookingTourGuideRequest";
const BookingTourGuideRequest = {
  bookingTourGuideRequest: (data: any) =>
    requests.post(`${_bookingTourGuideRequest}`, data),
  getBookingTourGuideRequest: () => requests.get(`${_bookingTourGuideRequest}`),
  getBookingTourGuideRequestDetail: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/${param}`),
  getBookingTourGuideRequestCustomer: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/customer/${param}`),
  getBookingTourGuideRequestTourguide: (param: any) =>
    requests.get(`${_bookingTourGuideRequest}/tourguide/${param}`),
};

const _cities = "Cities";
const Cities = {
  getCities: () => requests.get(`${_cities}`),
  addCity: (data: any) => requests.post(`${_cities}`, data),
  getCityDetail: (param: any) => requests.get(`${_cities}/${param}`),
  updateCityDetail: (param: any, data: any) =>
    requests.put(`${_cities}/${param}`, data),
  deleteCity: (param: any) => requests.del(`${_cities}/${param}`),
};

const _customer = "Customer";
const Customer = {
  updateInfo: (data: any) => requests.post(`${_customer}/update-info`, data),
  changePassword: (data: any) =>
    requests.post(`${_customer}/change-password`, data),
  updateAvatar: (data: any) => requests.post(`v1/customer/update-avatar`, data),
  getDetail: () => requests.get(`${_customer}/api/v1/customer`),
  getPrivate: () => requests.get(`${_customer}/api/v1/customer/private`),
};

const agent = {
  Auth,
  Register,
  BookingTour,
  BookingTourGuideRequest,
  Cities,
  Customer,
};
export default agent;
