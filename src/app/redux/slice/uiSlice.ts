import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const watchActions = ["auth/loginVerify", "auth/registerVerify"];

const initialState: TUI = {
  OTPModal: { open: false, extraValues: {} },
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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
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

export const { setShowOTPModal, resetOTPModal } = UISlice.actions;

export default UISlice.reducer;

type TUI = {
  OTPModal: { open: boolean; extraValues: object };
  isLoading: boolean;
};
