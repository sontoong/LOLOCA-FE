import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const watchActions = [
  "auth/send/loginVerify",
  "auth/send/registerVerify",
  "auth/send/forgetPasswordVerify",
];

const initialState: TUI = {
  OTPModal: { open: false, extraValues: {} },
  forgotPasswordForm: { step: 1, extraValues: {} },
  isLoading: false,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowOTPModal: (state, action: PayloadAction<TUI["OTPModal"]>) => {
      state.OTPModal = action.payload;
    },
    resetOTPModal: (state) => {
      state.OTPModal = { open: false, extraValues: {} };
    },
    setForgotPasswordForm: (
      state,
      action: PayloadAction<TUI["forgotPasswordForm"]>,
    ) => {
      state.forgotPasswordForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          // "user/login/SUCCESS" => "user/login"
          const baseActionType = action.type.substring(
            0,
            action.type.lastIndexOf("/"),
          );
          return (
            action.type.endsWith("/pending") &&
            watchActions.includes(baseActionType)
          );
        },
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => {
          const baseActionType = action.type.substring(
            0,
            action.type.lastIndexOf("/"),
          );
          return (
            (action.type.endsWith("/fulfilled") ||
              action.type.endsWith("/rejected")) &&
            watchActions.includes(baseActionType)
          );
        },
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const { setShowOTPModal, resetOTPModal, setForgotPasswordForm } =
  UISlice.actions;

export default UISlice.reducer;

type TUI = {
  OTPModal: { open: boolean; extraValues: object };
  forgotPasswordForm: { step: number; extraValues: object };
  isLoading: boolean;
};
