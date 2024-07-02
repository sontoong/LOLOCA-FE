import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { Tour, TourList } from "../../models/tour";

type TTour = {
  currentTour: Tour;
  currentTourList: TourList;
  isFetching: boolean;
};

const initialState: TTour = {
  currentTour: {} as Tour,
  currentTourList: { tours: [], totalPage: 0 },
  isFetching: false,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setCurrentTour: (state, action: PayloadAction<TTour["currentTour"]>) => {
      state.currentTour = action.payload;
    },
    setCurrentTourList: (
      state,
      action: PayloadAction<TTour["currentTourList"]>,
    ) => {
      state.currentTourList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("tour/") && action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tour/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const getTourRandom = createAsyncThunk<any, GetTourRandomParams>(
  "tour/getTourRandom",
  async (data, { rejectWithValue }) => {
    const { page, pageSize } = data;
    try {
      const response = await agent.Tour.getRandomTours({ page, pageSize });
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

export const getTourByCity = createAsyncThunk<any, GetTourByCityParams>(
  "tour/getTourByCity",
  async (data, { rejectWithValue }) => {
    const { cityId, page, pageSize } = data;
    try {
      const response = await agent.Tour.getTourByCity({
        cityId,
        page,
        pageSize,
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

export const getTourById = createAsyncThunk<any, GetTourByIdParams>(
  "tour/getTourById",
  async (data, { rejectWithValue }) => {
    const { tourId } = data;
    try {
      const response = await agent.Tour.getTourById(tourId);
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

export const getTourByTourGuide = createAsyncThunk<
  any,
  GetTourByTourGuideParams
>("tour/getTourByTourGuide", async (data, { rejectWithValue }) => {
  const { TourGuideId, page, pageSize } = data;
  try {
    const response = await agent.Tour.getTourByTourGuide({
      TourGuideId,
      page,
      pageSize,
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

export const { setCurrentTour, setCurrentTourList } = tourSlice.actions;

export default tourSlice.reducer;

export type GetTourRandomParams = {
  page: number;
  pageSize: number;
};

export type GetTourByCityParams = {
  cityId: number;
  page: number;
  pageSize: number;
};

export type GetTourByIdParams = {
  tourId: string;
};

export type GetTourByTourGuideParams = {
  TourGuideId: number;
  page: number;
  pageSize: number;
};
