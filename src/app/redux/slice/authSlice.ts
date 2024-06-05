import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { LoginParams, SignupParams } from "../../hooks/useAuth";

export interface IAuth {
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IAuth = {
  isFetching: false,
  error: false,
  displayError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
    });
  },
});

export const login = createAsyncThunk<any, LoginParams>(
  "auth/login",
  async (data) => {
    const { email, password } = data;

    try {
      const response = await agent.Auth.login({
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);

export const signup = createAsyncThunk<any, SignupParams>(
  "auth/login",
  async (data) => {
    try {
      const response = await agent.Register.registerCustomer({
        ...data,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);

export default authSlice.reducer;
