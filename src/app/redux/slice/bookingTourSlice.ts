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
          action.type.startsWith("bookingTour/fetch/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("bookingTour/send/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isSending: true };
        },
      );
    builder.addMatcher(
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
  "bookingTour/send/createBookingTour",
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
  "bookingTour/fetch/getBookingTourByCustomerId",
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
  "bookingTour/fetch/getBookingTourByTourGuideId",
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

export const getBookingTourById = createAsyncThunk<
  any,
  GetBookingTourByIdParams
>("bookingTour/fetch/getBookingTourById", async (data, { rejectWithValue }) => {
  const { id } = data;
  try {
    const response = await agent.BookingTour.getBookingTourById(id);
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

export type GetBookingTourByIdParams = {
  id: string;
};
