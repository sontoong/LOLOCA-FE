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

const _authBase = "auth";
const Auth = {
  login: (data: any) => baseRequests.post(`${_authBase}/login`, data),
  signup: (data: any) => baseRequests.post("user/new-account", data),
  logout: (data: any) => baseRequests.post(`${_authBase}/logout`, data),
  refreshToken: (data: any) =>
    baseRequests.post(`${_authBase}/refresh-token`, data),
};

const _orderBase = "order";
const Orders = {
  getOrderById: (data: any) => requests.post(`${_orderBase}`, data),
  createNewOrder: (data: any) => requests.post(`${_orderBase}/new-order`, data),
  cancelOrder: (data: any) => requests.del(`${_orderBase}`, data),
};

const agent = {
  Auth,
  Orders,
};
export default agent;
