import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { Tour, TourList } from "../../models/tour";
type TTour = {
  currentTour: Tour;
  randomTours: TourList;
  currentCityTours: TourList;
  isFetching: boolean;
};

const initialState: TTour = {
  currentTour: {} as Tour,
  randomTours: { tours: [], totalPage: 0 },
  currentCityTours: { tours: [], totalPage: 0 },
  isFetching: false,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setCurrentTour: (state, action: PayloadAction<TTour["currentTour"]>) => {
      state.currentTour = action.payload;
    },
    setRandomTourlist: (state, action: PayloadAction<TTour["randomTours"]>) => {
      state.randomTours = action.payload;
    },
    setRandomCitylist: (
      state,
      action: PayloadAction<TTour["currentCityTours"]>
    ) => {
      state.currentCityTours = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("tour/") && action.type.endsWith("/pending"),
        (state) => {
          state.isFetching = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tour/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        }
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
  }
);

export const getTourByCity = createAsyncThunk<any, GetTourCityParams>(
  "tour/getTourCity",
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
  }
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
  }
);

export const { setCurrentTour, setRandomTourlist, setRandomCitylist } =
  tourSlice.actions;

export default tourSlice.reducer;

export type GetTourRandomParams = {
  page: number;
  pageSize: number;
};

export type GetTourCityParams = {
  cityId: number;
  page: number;
  pageSize: number;
};

export type GetTourByIdParams = {
  tourId: string;
};
