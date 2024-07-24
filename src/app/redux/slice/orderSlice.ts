import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { OrderList, RequestTour } from "../../models/order";
import { excludedActionsPending } from "./uiSlice";

type TOrder = {
  requestTour: RequestTour;
  currentOrderList: OrderList;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TOrder = {
  requestTour: {} as TOrder["requestTour"],
  currentOrderList: [],
  isFetching: false,
  isSending: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setRequestTour: (state, action: PayloadAction<TOrder["requestTour"]>) => {
      state.requestTour = action.payload;
    },
    setCurrentOrderList: (state, action: PayloadAction<OrderList>) => {
      state.currentOrderList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("order/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("order/send/") &&
          action.type.endsWith("/fulfilled") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isSending: true };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("order/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const createOrderTour = createAsyncThunk<any, CreateOrderTourParams>(
  "order/send/createOrderTour",
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

export const createOrderTourGuide = createAsyncThunk<
  any,
  CreateOrderTourGuideParams
>("order/send/createOrderTourGuide", async (data, { rejectWithValue }) => {
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
  "order/fetch/getOrderDetail",
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

export const { setCurrentOrderList, setRequestTour } = orderSlice.actions;

export default orderSlice.reducer;

export type CreateOrderTourParams = {
  bookingTourRequestsId: string;
  paymentProvider: string;
  transactionCode: string;
};

export type CreateOrderTourGuideParams = {
  bookingTourGuideRequestId: string;
  paymentProvider: string;
  transactionCode: string;
};

export type GetOrderDetailParams = {
  id: string;
};
