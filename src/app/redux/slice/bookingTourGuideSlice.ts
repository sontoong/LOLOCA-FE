import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { BookingTourGuideRequest } from "../../models/bookingTourGuide";

type TBookingTourGuide = {
  currentBookingTourGuide: BookingTourGuideRequest;
  currentBookingTourGuideList: BookingTourGuideRequest[];
  isFetching: boolean;
};

const initialState: TBookingTourGuide = {
  currentBookingTourGuide: {} as BookingTourGuideRequest,
  currentBookingTourGuideList: [],
  isFetching: false,
};

const bookingTourGuideSlice = createSlice({
  name: "bookingTourGuide",
  initialState,
  reducers: {
    setCurrentBookingTourGuide: (
      state,
      action: PayloadAction<TBookingTourGuide["currentBookingTourGuide"]>,
    ) => {
      state.currentBookingTourGuide = action.payload;
    },
    setCurrentBookingTourGuideList: (
      state,
      action: PayloadAction<TBookingTourGuide["currentBookingTourGuideList"]>,
    ) => {
      state.currentBookingTourGuideList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("bookingTourGuide/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("bookingTourGuide/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const createBookingTourGuide = createAsyncThunk<
  any,
  CreateBookingTourGuideParams
>(
  "bookingTourGuide/createBookingTourGuide",
  async (data, { rejectWithValue }) => {
    const {
      customerId,
      endDate,
      note,
      numOfAdult,
      numOfChild,
      startDate,
      tourGuideId,
    } = data;
    try {
      const response =
        await agent.BookingTourGuideRequest.createBookingTourGuide({
          customerId,
          endDate,
          note,
          numOfAdult,
          numOfChild,
          startDate,
          tourGuideId,
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

export const getBookingTourGuideByCustomerId = createAsyncThunk<
  any,
  GetBookingTourGuideByCustomerIdParams
>(
  "bookingTourGuide/getBookingTourGuideByCustomerId",
  async (data, { rejectWithValue }) => {
    const { customerId } = data;
    try {
      const response =
        await agent.BookingTourGuideRequest.getBookingTourGuideByCustomerId(
          customerId,
        );
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

export const getBookingTourGuideByTourGuideId = createAsyncThunk<
  any,
  GetBookingTourGuideByTourGuideIdParams
>(
  "bookingTourGuide/getBookingTourGuideByTourGuideId",
  async (data, { rejectWithValue }) => {
    const { tourGuideId } = data;
    try {
      const response =
        await agent.BookingTourGuideRequest.getBookingTourGuideByTourGuideId(
          tourGuideId,
        );
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

export const { setCurrentBookingTourGuide, setCurrentBookingTourGuideList } =
  bookingTourGuideSlice.actions;

export default bookingTourGuideSlice.reducer;

export type CreateBookingTourGuideParams = {
  tourGuideId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  note: string;
  numOfAdult: number;
  numOfChild: number;
};

export type GetBookingTourGuideByCustomerIdParams = {
  customerId: string;
};

export type GetBookingTourGuideByTourGuideIdParams = {
  tourGuideId: string;
};