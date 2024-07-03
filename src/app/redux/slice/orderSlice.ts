import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { Order } from "../../models/order";

type TOrder = {
  currentOrder: Order;
  isFetching: boolean;
};

const initialState: TOrder = {
  currentOrder: {} as Order,
  isFetching: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("order/") && action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("order/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const createOrderTour = createAsyncThunk<any, CreateOrderTourParams>(
  "order/createOrderTour",
  async (data, { rejectWithValue }) => {
    const { bookingTourRequestsId, paymentProvider, transactionCode } = data;
    try {
      const response = await agent.Order.createOrderTour({
        bookingTourRequestsId,
        paymentProvider,
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

export const createOrderTourguide = createAsyncThunk<
  any,
  CreateOrderTourGuideParams
>("order/createOrderTour", async (data, { rejectWithValue }) => {
  const { bookingTourGuideRequestId, paymentProvider, transactionCode } = data;
  try {
    const response = await agent.Order.createOrderTourGuide({
      bookingTourGuideRequestId,
      paymentProvider,
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
});

export const getOrderDetail = createAsyncThunk<any, GetOrderDetailParams>(
  "order/createOrderTour",
  async (data, { rejectWithValue }) => {
    const { id } = data;
    try {
      const response = await agent.Order.getOrderDetail(id);
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

export const { setCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;

export type CreateOrderTourParams = {
  bookingTourRequestsId: number;
  paymentProvider: string;
  transactionCode: string;
};

export type CreateOrderTourGuideParams = {
  bookingTourGuideRequestId: 0;
  paymentProvider: string;
  transactionCode: string;
};

export type GetOrderDetailParams = {
  id: string;
};
