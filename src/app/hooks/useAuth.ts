import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { ROLE } from "../../constants/role";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  forgetPassword,
  forgetPasswordNewpassword,
  ForgetPasswordNewPasswordParams,
  ForgetPasswordParams,
  forgetPasswordVerify,
  ForgetPasswordVerifyParams,
  login,
  LoginParams,
  loginVerify,
  register,
  RegisterParams,
  registerVerify,
  setCurrentUser,
  tourGuideRegister,
  TourGuideRegisterParams,
  VerifyParams,
} from "../redux/slice/authSlice";
import { getCustomerById } from "../redux/slice/customerSlice";
import { getTourGuidePrivateById } from "../redux/slice/tourguideSlice";
import {
  resetOTPModal,
  setForgotPasswordForm,
  setShowOTPModal,
} from "../redux/slice/uiSlice";

export function useAuth() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (value: LoginParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(login(value));
      if (login.fulfilled.match(resultAction)) {
        const { accessToken, refreshToken } = resultAction.payload;
        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          const decode = jwtDecode(accessToken) as any;
          localStorage.setItem(
            "userId",
            decode.CustomerId ?? decode.TourGuideId,
          );
          dispatch(setCurrentUser(decode));
          navigate("/");
        } else {
          dispatch(
            setShowOTPModal({
              open: true,
              extraValues: { email: value.email },
            }),
          );
        }
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

  const handleLoginVerify = useCallback(
    async (value: VerifyParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(loginVerify(value));
      if (loginVerify.fulfilled.match(resultAction)) {
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

  const handleTourGuideRegister = useCallback(
    async (value: TourGuideRegisterParams) => {
      const resultAction = await dispatch(tourGuideRegister(value));
      if (tourGuideRegister.fulfilled.match(resultAction)) {
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
          getTourGuidePrivateById({ tourGuideId: userId }),
        );
        if (getTourGuidePrivateById.fulfilled.match(resultAction)) {
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

  const handleOTPLoginSubmit = useCallback(
    async (value: VerifyParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(loginVerify(value));
      if (loginVerify.fulfilled.match(resultAction)) {
        dispatch(resetOTPModal());
        const { accessToken, refreshToken } = resultAction.payload;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        const decode = jwtDecode(accessToken) as any;
        localStorage.setItem("userId", decode.CustomerId ?? decode.TourGuideId);
        dispatch(setCurrentUser(decode));
        navigate("/");
      } else if (loginVerify.rejected.match(resultAction)) {
        const resultAction = await dispatch(registerVerify(value));
        if (registerVerify.fulfilled.match(resultAction)) {
          dispatch(resetOTPModal());
          const { accessToken, refreshToken } = resultAction.payload;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          const decode = jwtDecode(accessToken) as any;
          localStorage.setItem(
            "userId",
            decode.CustomerId ?? decode.TourGuideId,
          );
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
      }
    },
    [dispatch, notification],
  );

  const handleForgetPassword = useCallback(
    async (value: ForgetPasswordParams) => {
      const resultAction = await dispatch(forgetPassword(value));
      if (forgetPassword.fulfilled.match(resultAction)) {
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

  const handleForgetPasswordVerify = useCallback(
    async (value: ForgetPasswordVerifyParams) => {
      const resultAction = await dispatch(forgetPasswordVerify(value));
      if (forgetPasswordVerify.fulfilled.match(resultAction)) {
        dispatch(resetOTPModal());
        dispatch(
          setForgotPasswordForm({
            step: 2,
            extraValues: { ...resultAction.payload },
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

  const handleForgetPasswordNewPassword = useCallback(
    async (
      value: ForgetPasswordNewPasswordParams,
      navigate: NavigateFunction,
    ) => {
      const resultAction = await dispatch(forgetPasswordNewpassword(value));
      if (forgetPasswordNewpassword.fulfilled.match(resultAction)) {
        navigate("/login");
        notification.success({
          message: "Update Success",
          description: `Please login again`,
          placement: "topRight",
        });
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

  return {
    state,
    handleLogin,
    handleRegister,
    handleLogout,
    handleLoginVerify,
    handleRegisterVerify,
    handleGetUserInfo,
    handleTourGuideRegister,
    handleOTPLoginSubmit,
    handleForgetPassword,
    handleForgetPasswordVerify,
    handleForgetPasswordNewPassword,
  };
}
