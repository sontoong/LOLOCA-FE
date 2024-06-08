import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../models/user";
import agent from "../../utils/agent";
import { GetCustomerByIdParams } from "../../hooks/useCustomer";
import { AxiosError } from "axios";

type TCustomer = {
  currentCustomer: Customer;
  isFetching: boolean;
};

const initialState: TCustomer = {
  currentCustomer: {} as Customer,
  isFetching: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCurrentCustomer: (state, action: PayloadAction<Customer>) => {
      state.currentCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.isFetching = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        }
      );
  },
});

export const getCustomerById = createAsyncThunk<any, GetCustomerByIdParams>(
  "customer/getCustomerById",
  async (data, { rejectWithValue }) => {
    const { customerId } = data;
    try {
      const response = await agent.Customer.getCustomerById(customerId);
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

export const { setCurrentCustomer } = customerSlice.actions;

export default customerSlice.reducer;
