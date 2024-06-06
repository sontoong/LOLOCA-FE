import { useAppDispatch, useAppSelector } from "../redux/hook";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { login, signup } from "../redux/slice/authSlice";
import { App } from "antd";

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};

export type LogoutParams = {
  userId: string;
};

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (
    value: LoginParams,
    navigate: NavigateFunction
  ) => {
    try {
      const { data } = await dispatch(login(value)).unwrap();
      const { token, data: userData } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      const decode = jwtDecode(token) as any;
      localStorage.setItem("userId", decode.id);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        notification.error({
          message: "Lỗi",
          description: errorResponse,
          placement: "topRight",
        });
      }
    }
  };

  const handleSignup = async (
    value: SignupParams,
    navigate: NavigateFunction
  ) => {
    try {
      const { data } = await dispatch(signup(value)).unwrap();
      const { token, data: userData } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      const decode = jwtDecode(token) as any;
      localStorage.setItem("userId", decode.id);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        notification.error({
          message: "Lỗi",
          description: errorResponse,
          placement: "topRight",
        });
      }
    }
  };

  const handleLogout = async (
    value: LogoutParams,
    navigate: NavigateFunction
  ) => {
    try {
      // const response = await dispatch(logout(value));
      // if (response) {
      //   localStorage.clear();
      //   navigate("/login");
      // }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.message;
        notification.error({
          message: "Lỗi",
          description: errorResponse,
          placement: "topRight",
        });
      }
    }
  };

  return { state, handleLogin, handleSignup, handleLogout };
}
