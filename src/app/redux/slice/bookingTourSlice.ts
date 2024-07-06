import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { BookingTourRequest } from "../../models/bookingTour";

type TBookingTour = {
  currentBookingTour: BookingTourRequest;
  currentBookingTourList: BookingTourRequest[];
  isFetching: boolean;
};

const initialState: TBookingTour = {
  currentBookingTour: {} as BookingTourRequest,
  currentBookingTourList: [],
  isFetching: false,
};

const bookingTourSlice = createSlice({
  name: "bookingTour",
  initialState,
  reducers: {
    setCurrentBookingTour: (
      state,
      action: PayloadAction<TBookingTour["currentBookingTour"]>,
    ) => {
      state.currentBookingTour = action.payload;
    },
    setCurrentBookingTourList: (
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
      const response =
        await agent.BookingTour.getBookingTourByCustomerId(customerId);
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

export const getBookingTourByTourGuideId = createAsyncThunk<
  any,
  GetBookingTourByTourGuideIdParams
>(
  "bookingTour/getBookingTourByTourGuideId",
  async (data, { rejectWithValue }) => {
    const { tourGuideId } = data;
    try {
      const response =
        await agent.BookingTour.getBookingTourByTourGuideId(tourGuideId);
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

export const { setCurrentBookingTour, setCurrentBookingTourList } =
  bookingTourSlice.actions;

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
  customerId: string;
};

export type GetBookingTourByTourGuideIdParams = {
  tourGuideId: string;
};
