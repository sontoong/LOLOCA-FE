import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { User } from "../../models/user";
import { jwtDecode } from "jwt-decode";
import { Customer } from "../../models/customer";
import { TourGuide } from "../../models/tourGuide";

const token = localStorage.getItem("access_token");
let initUser = {};
if (token && token !== "undefined") {
  initUser = jwtDecode(token);
} else {
  localStorage.clear();
}

export type TAuth = {
  currentUser: User & (Customer | TourGuide);
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TAuth = {
  currentUser: initUser as User & (Customer | TourGuide),
  isFetching: false,
  isSending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TAuth["currentUser"]>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/fetch/") &&
          action.type.endsWith("/pending"),
        () => {
          return {
            ...initialState,
            isFetching: true,
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/send/") &&
          action.type.endsWith("/pending") &&
          ![
            "auth/send/loginVerify/pending",
            "auth/send/registerVerify/pending",
          ].includes(action.type),
        () => {
          return { ...initialState, isSending: true };
        },
      );
    builder.addMatcher(
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
  "auth/send/login",
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
  "auth/send/loginVerify",
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
  "auth/send/register",
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

export const tourGuideRegister = createAsyncThunk<any, TourGuideRegisterParams>(
  "auth/send/registerTourGuide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.registerTourGuide({
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
  "auth/send/registerVerify",
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

export const { setCurrentUser } = authSlice.actions;

export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};

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

export type TourGuideRegisterParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  gender: number | null;
  cityId: number | null;
  address: string;
  dateOfBirth: string;
};

export type LogoutParams = {
  userId: string;
};

export type VerifyParams = {
  email: string;
  code: string;
};
