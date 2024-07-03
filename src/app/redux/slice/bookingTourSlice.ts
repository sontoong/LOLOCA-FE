import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";

type TBookingTour = {
  currentBookingTourList: any;
  isFetching: boolean;
};

const initialState: TBookingTour = {
  currentBookingTourList: { tours: [], totalPage: 0 },
  isFetching: false,
};

const bookingTourSlice = createSlice({
  name: "bookingTour",
  initialState,
  reducers: {
    setCurrentTourList: (
      state,
      action: PayloadAction<TBookingTour["currentBookingTourList"]>,
    ) => {
      state.currentBookingTourList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("bookingTour/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("bookingTour/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const createBookingTour = createAsyncThunk<any, CreateBookingTourParams>(
  "bookingTour/createBookingTour",
  async (data, { rejectWithValue }) => {
    const {
      customerId,
      endDate,
      note,
      numOfAdult,
      numOfChild,
      startDate,
      totalPrice,
      tourId,
    } = data;
    try {
      const response = await agent.BookingTour.createBookingTour({
        customerId,
        endDate,
        note,
        numOfAdult,
        numOfChild,
        startDate,
        totalPrice,
        tourId,
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

export const getBookingTourByCustomerId = createAsyncThunk<
  any,
  GetBookingTourByCustomerIdParams
>(
  "bookingTour/getBookingTourByCustomerId",
  async (data, { rejectWithValue }) => {
    const { customerId } = data;
    try {
      const response = await agent.BookingTour.getBookingTourByCustomerId({
        customerId,
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

export const { setCurrentTourList } = bookingTourSlice.actions;

export default bookingTourSlice.reducer;

export type CreateBookingTourParams = {
  tourId: number;
  customerId: number;
  startDate: string;
  endDate: string;
  note: string;
  numOfAdult: number;
  numOfChild: number;
  totalPrice: number;
};

export type GetBookingTourByCustomerIdParams = {
  customerId: number;
};
