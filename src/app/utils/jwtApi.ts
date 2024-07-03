import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { router } from "../routes/route";
import agent from "./agent";
import { Envs } from "./env";

const baseURL = Envs.apiLocal;

const apiJWT = axios.create({
  baseURL,
  timeout: 10000,
  // withCredentials: true,
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

apiJWT.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (token) {
    const date = new Date();
    const decodeToken = jwtDecode(token) as { exp: number };

    if (decodeToken.exp < date.getTime() / 1000) {
      try {
        const { data } = await agent.Auth.refreshToken({
          refreshToken: refreshToken,
        });
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            localStorage.clear();
            window.location.href = "/login";
            // router.navigate("/login");
            throw error;
          }
        } else {
          console.log(error);
        }
      }
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  NProgress.start();
  return config;
});

apiJWT.interceptors.response.use(
  async (response) => {
    await sleep();
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.response && [401].includes(error.response.status)) {
      localStorage.clear();
      // window.location.href = "/login";
      router.navigate("/login");
    }
    return Promise.reject(error);
  },
);

export default apiJWT;
