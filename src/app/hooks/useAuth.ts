import { useAppDispatch, useAppSelector } from "../redux/hook";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  login,
  register,
  registerVerify,
  setShowOTPModal,
} from "../redux/slice/authSlice";
import { App } from "antd";

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (value: LoginParams) => {
    const resultAction = await dispatch(login(value));
    if (login.fulfilled.match(resultAction)) {
      console.log("ok");
    } else {
      if (resultAction.payload) {
        notification.error({
          message: "Lỗi",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: resultAction.error.message,
          placement: "topRight",
        });
      }
    }
  };

  const handleRegister = async (value: RegisterParams) => {
    const resultAction = await dispatch(register(value));
    if (register.fulfilled.match(resultAction)) {
      console.log("ok");
      dispatch(
        setShowOTPModal({
          open: true,
          email: value.email,
        })
      );
    } else {
      if (resultAction.payload) {
        notification.error({
          message: "Lỗi",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: resultAction.error.message,
          placement: "topRight",
        });
      }
    }
  };

  const handleRegisterVerify = async (
    value: VerifyParams,
    navigate: NavigateFunction
  ) => {
    const resultAction = await dispatch(registerVerify(value));
    if (registerVerify.fulfilled.match(resultAction)) {
      const { accessToken, refreshToken } = resultAction.payload;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      const decode = jwtDecode(accessToken) as any;
      localStorage.setItem("userId", decode.AccountId);
      navigate("/");
    } else {
      if (resultAction.payload) {
        notification.error({
          message: "Lỗi",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: resultAction.error.message,
          placement: "topRight",
        });
      }
    }
  };

  const handleLogout = async (navigate: NavigateFunction) => {
    try {
      // const response = await dispatch(logout(value));
      // if (response) {
      localStorage.clear();
      navigate("/login");
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

  return {
    state,
    handleLogin,
    handleRegister,
    handleLogout,
    handleRegisterVerify,
  };
}

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
};

export type LogoutParams = {
  userId: string;
};

export type VerifyParams = {
  email: string;
  code: string;
};
