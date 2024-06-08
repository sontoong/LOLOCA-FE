import { useAppDispatch, useAppSelector } from "../redux/hook";
import { NavigateFunction } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  login,
  // loginVerify,
  register,
  registerVerify,
  resetOTPModal,
  setCurrentUser,
  setShowOTPModal,
} from "../redux/slice/authSlice";
import { App } from "antd";
import { ROLE } from "../../constants/role";
import {
  getCustomerById,
  setCurrentCustomer,
} from "../redux/slice/customerSlice";
import { useCallback } from "react";
import {
  getTourguideById,
  setCurrentTourguide,
} from "../redux/slice/tourguideSlice";

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (
    value: LoginParams,
    navigate: NavigateFunction
  ) => {
    const resultAction = await dispatch(login(value));
    if (login.fulfilled.match(resultAction)) {
      // dispatch(
      //   setShowOTPModal({
      //     open: true,
      //     email: value.email,
      //   })
      // );
      const { accessToken, refreshToken } = resultAction.payload;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      const decode = jwtDecode(accessToken) as any;
      localStorage.setItem("userId", decode.CustomerId ?? decode.TourguideId);
      dispatch(setCurrentUser(decode));
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

  // const handleLoginVerify = async (
  //   value: VerifyParams,
  //   navigate: NavigateFunction
  // ) => {
  //   const resultAction = await dispatch(loginVerify(value));
  //   if (loginVerify.fulfilled.match(resultAction)) {
  //     dispatch(resetOTPModal());
  //     const { accessToken, refreshToken } = resultAction.payload;
  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("refresh_token", refreshToken);
  //     const decode = jwtDecode(accessToken) as any;
  //     localStorage.setItem("userId", decode.CustomerId ?? decode.TourguideId);
  //     navigate("/");
  //   } else {
  //     if (resultAction.payload) {
  //       notification.error({
  //         message: "Error",
  //         description: `${resultAction.payload}`,
  //         placement: "topRight",
  //       });
  //     } else {
  //       notification.error({
  //         message: "Error",
  //         description: resultAction.error.message,
  //         placement: "topRight",
  //       });
  //     }
  //   }
  // };

  const handleRegister = async (value: RegisterParams) => {
    const resultAction = await dispatch(register(value));
    if (register.fulfilled.match(resultAction)) {
      dispatch(
        setShowOTPModal({
          open: true,
          email: value.email,
        })
      );
    } else {
      if (resultAction.payload) {
        notification.error({
          message: "Error",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Error",
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
      dispatch(resetOTPModal());
      const { accessToken, refreshToken } = resultAction.payload;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      const decode = jwtDecode(accessToken) as any;
      localStorage.setItem("userId", decode.CustomerId ?? decode.TourguideId);
      dispatch(setCurrentUser(decode));
      navigate("/");
    } else {
      if (resultAction.payload) {
        notification.error({
          message: "Error",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Error",
          description: resultAction.error.message,
          placement: "topRight",
        });
      }
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleGetUserInfo = useCallback(async () => {
    const userId = localStorage.getItem("userId") ?? "";
    const role = state.currentUser.Role;

    switch (role) {
      case ROLE.customer: {
        const resultAction = await dispatch(
          getCustomerById({ customerId: userId })
        );
        if (getCustomerById.fulfilled.match(resultAction)) {
          dispatch(setCurrentCustomer(resultAction.payload));
        } else {
          notification.error({
            message: "Error",
            description: resultAction.payload
              ? `${resultAction.payload}`
              : resultAction.error.message,
            placement: "topRight",
          });
        }
        break;
      }
      case ROLE.tourguide: {
        const resultAction = await dispatch(
          getTourguideById({ tourGuideId: userId })
        );
        if (getTourguideById.fulfilled.match(resultAction)) {
          dispatch(setCurrentTourguide(resultAction.payload));
        } else {
          notification.error({
            message: "Error",
            description: resultAction.payload
              ? `${resultAction.payload}`
              : resultAction.error.message,
            placement: "topRight",
          });
        }
        break;
      }
      default:
        break;
    }
  }, [dispatch, state.currentUser.Role, notification]);

  return {
    state,
    handleLogin,
    handleRegister,
    handleLogout,
    // handleLoginVerify,
    handleRegisterVerify,
    handleGetUserInfo,
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
