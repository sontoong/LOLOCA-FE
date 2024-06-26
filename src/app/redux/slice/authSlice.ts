import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { User } from "../../models/user";
import { jwtDecode } from "jwt-decode";
import { Customer } from "../../models/customer";
import { TourGuide } from "../../models/tourGuide";

const token = localStorage.getItem("access_token");
let initUser = {};
if (token) {
  initUser = jwtDecode(token);
}

export type TAuth = {
  currentUser: User & (Customer | TourGuide);
  isFetching: boolean;
  showOTPModal: { open: boolean; extraValues: object };
};

const initialState: TAuth = {
  currentUser: initUser as User & (Customer | TourGuide),
  isFetching: false,
  showOTPModal: { open: false, extraValues: {} },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TAuth["currentUser"]>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setShowOTPModal: (state, action: PayloadAction<TAuth["showOTPModal"]>) => {
      state.showOTPModal = action.payload;
    },
    resetOTPModal: (state) => {
      state.showOTPModal = { open: false, extraValues: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const login = createAsyncThunk<any, LoginParams>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await agent.Auth.login({
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const loginVerify = createAsyncThunk<any, VerifyParams>(
  "auth/loginVerify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.authVerify({
        ...data,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const register = createAsyncThunk<any, RegisterParams>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.registerCustomer({
        ...data,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const registerVerify = createAsyncThunk<any, VerifyParams>(
  "auth/registerVerify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.registerVerify({
        ...data,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const { setCurrentUser, setShowOTPModal, resetOTPModal } =
  authSlice.actions;

export default authSlice.reducer;

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
