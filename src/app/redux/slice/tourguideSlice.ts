import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { TourGuide, TourGuideList } from "../../models/tourGuide";

type TTourGuide = {
  currentTourguide: TourGuide;
  currentTourGuideList: TourGuideList;
  isFetching: boolean;
};

const initialState: TTourGuide = {
  currentTourguide: {} as TourGuide,
  currentTourGuideList: { tourGuides: [], totalPage: 0 },
  isFetching: false,
};

const tourguideSlice = createSlice({
  name: "tourGuide",
  initialState,
  reducers: {
    setCurrentTourGuide: (state, action: PayloadAction<TourGuide>) => {
      state.currentTourguide = action.payload;
    },
    setCurrentTourGuideList: (state, action: PayloadAction<TourGuideList>) => {
      state.currentTourGuideList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("tourguide/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tourguide/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const getTourGuideById = createAsyncThunk<any, GetTourGuideByIdParams>(
  "tourGuide/getTourGuideById",
  async (data, { rejectWithValue }) => {
    const { tourGuideId } = data;
    try {
      const response = await agent.TourGuide.getTourGuideById(tourGuideId);
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

export const getRandomTourGuide = createAsyncThunk<
  any,
  GetRandomTourGuideParams
>("tourGuide/getRandomTourGuide", async (data, { rejectWithValue }) => {
  const { page, pageSize } = data;
  try {
    const response = await agent.TourGuide.getRandomTourGuide({
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

export const getRandomTourGuideInCity = createAsyncThunk<
  any,
  GetRandomTourGuideInCityParams
>("tourGuide/getRandomTourGuideInCity", async (data, { rejectWithValue }) => {
  const { page, pageSize, CityId } = data;
  try {
    const response = await agent.TourGuide.getRandomTourGuideInCity({
      CityId,
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

export const { setCurrentTourGuide, setCurrentTourGuideList } =
  tourguideSlice.actions;

export default tourguideSlice.reducer;

export type GetTourGuideByIdParams = {
  tourGuideId: string;
};

export type GetRandomTourGuideParams = {
  page: number;
  pageSize: number;
};

export type GetRandomTourGuideInCityParams = {
  page: number;
  pageSize: number;
  CityId: number;
};
