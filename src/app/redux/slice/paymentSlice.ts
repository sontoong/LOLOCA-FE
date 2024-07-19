import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { DepositList } from "../../models/payment";
import { excludedActionsPending } from "./uiSlice";

type TPayment = {
  currentDepositList: DepositList;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TPayment = {
  currentDepositList: [],
  isFetching: false,
  isSending: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCurrentDepositList: (
      state,
      action: PayloadAction<TPayment["currentDepositList"]>,
    ) => {
      state.currentDepositList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("payment/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("payment/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isSending: true };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("payment/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const createDeposit = createAsyncThunk<any, CreateDepositParams>(
  "payment/send/createDeposit",
  async (data, { rejectWithValue }) => {
    const { accountId, amount, transactionCode } = data;
    try {
      const response = await agent.PaymentRequest.createDeposit({
        accountId,
        amount,
        transactionCode,
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

export const getDepositByCustomerId = createAsyncThunk<
  any,
  GetDepositByCustomerIdParams
>("payment/fetch/getDepositByCustomerId", async (data, { rejectWithValue }) => {
  const { customerId, status } = data;
  try {
    const response = await agent.PaymentRequest.getDepositByCustomerId({
      customerId,
      status,
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
});

export const getDepositByTourGuideId = createAsyncThunk<
  any,
  GetDepositByTourGuideIdParams
>(
  "payment/fetch/getDepositByTourGuideId",
  async (data, { rejectWithValue }) => {
    const { tourGuideId, status } = data;
    try {
      const response = await agent.PaymentRequest.getDepositByTourGuideId({
        tourGuideId,
        status,
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

export const { setCurrentDepositList } = paymentSlice.actions;

export default paymentSlice.reducer;

export type CreateDepositParams = {
  accountId: string;
  amount: number;
  transactionCode: string;
};

export type GetDepositByCustomerIdParams = {
  customerId: string;
  status: number;
};

export type GetDepositByTourGuideIdParams = {
  tourGuideId: string;
  status: number;
};
