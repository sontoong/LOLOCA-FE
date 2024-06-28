import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { ROLE } from "../../constants/role";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  login,
  LoginParams,
  // loginVerify,
  register,
  RegisterParams,
  registerVerify,
  resetOTPModal,
  setCurrentUser,
  setShowOTPModal,
  VerifyParams,
} from "../redux/slice/authSlice";
import { getCustomerById } from "../redux/slice/customerSlice";
import { getTourGuideById } from "../redux/slice/tourguideSlice";

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (value: LoginParams, navigate: NavigateFunction) => {
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
        localStorage.setItem("userId", decode.CustomerId ?? decode.TourGuideId);
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
    },
    [dispatch, notification],
  );

  // const handleLoginVerify = useCallback(async (
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
  //     localStorage.setItem("userId", decode.CustomerId ?? decode.TourGuideId);
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
  // }, [dispatch, notification]);

  const handleRegister = useCallback(
    async (value: RegisterParams) => {
      const resultAction = await dispatch(register(value));
      if (register.fulfilled.match(resultAction)) {
        dispatch(
          setShowOTPModal({
            open: true,
            extraValues: { email: value.email },
          }),
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
    },
    [dispatch, notification],
  );

  const handleRegisterVerify = useCallback(
    async (value: VerifyParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(registerVerify(value));
      if (registerVerify.fulfilled.match(resultAction)) {
        dispatch(resetOTPModal());
        const { accessToken, refreshToken } = resultAction.payload;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        const decode = jwtDecode(accessToken) as any;
        localStorage.setItem("userId", decode.CustomerId ?? decode.TourGuideId);
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
    },
    [dispatch, notification],
  );

  const handleLogout = useCallback(async () => {
    localStorage.clear();
    window.location.href = "/login";
  }, []);

  const handleGetUserInfo = useCallback(async () => {
    const userId = localStorage.getItem("userId") ?? "";
    const role = state.currentUser.Role;

    switch (role) {
      case ROLE.customer: {
        const resultAction = await dispatch(
          getCustomerById({ customerId: parseInt(userId) }),
        );
        if (getCustomerById.fulfilled.match(resultAction)) {
          dispatch(setCurrentUser(resultAction.payload));
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
          getTourGuideById({ tourGuideId: parseInt(userId) }),
        );
        if (getTourGuideById.fulfilled.match(resultAction)) {
          dispatch(setCurrentUser(resultAction.payload));
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
