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
  // withCredentials: true,
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

apiJWT.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  // const user = localStorage.getItem("user");
  // const userObj = user ? JSON.parse(user) : {};
  if (token) {
    const date = new Date();
    const decodeToken = jwtDecode(token) as { exp: number };

    if (decodeToken.exp < date.getTime() / 1000) {
      try {
        const { data } = await agent.Auth.refreshToken({
          refreshToken: refreshToken,
        });
        console.log(data);
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        // config.headers["uid"] = `Bearer ${data.data.id}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        // localStorage.setItem("uid", data.data.id);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            localStorage.clear();
            router.navigate("/login");
            throw error;
          }
        } else {
          console.log(error);
        }
      }
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
      // config.headers["uid"] = `${userObj.user.id}`;
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
    console.log(error);
    // const token = localStorage.getItem("access_token");
    if (error.response && error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      // router.navigate("/login");
    }
    // if (
    //   error.response &&
    //   error.response?.status === 403 &&
    //   error.response?.data?.error?.message !== "User has been blocked" &&
    //   token
    // ) {
    //   router.navigate("/forbidden");
    // }
    return Promise.reject(error.response ?? error);
  }
);

export default apiJWT;
