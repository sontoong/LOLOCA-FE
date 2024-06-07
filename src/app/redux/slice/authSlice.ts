import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { LoginParams, RegisterParams, VerifyParams } from "../../hooks/useAuth";

export interface IAuth {
  isFetching: boolean;
  showOTPModal: { open: boolean; email: string };
}

const initialState: IAuth = {
  isFetching: false,
  showOTPModal: { open: false, email: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowOTPModal: (state, action: PayloadAction<IAuth["showOTPModal"]>) => {
      state.showOTPModal = action.payload;
    },
    resetOTPModal: (state) => {
      state.showOTPModal = { open: false, email: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(register.pending, (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(
      (action) =>
        action.type.startsWith("auth/") && action.type.endsWith("/pending"),
      (state) => {
        state.isFetching = true;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("auth/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
      }
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
  }
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
  }
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
  }
);

export const { setShowOTPModal, resetOTPModal } = authSlice.actions;

export default authSlice.reducer;
