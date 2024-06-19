import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TourGuide } from "../../models/user";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { TourGuideList } from "../../models/tourGuide";

type TTourGuide = {
  currentUser: TourGuide;
  currentTourGuideList: TourGuideList;
  isFetching: boolean;
};

const initialState: TTourGuide = {
  currentUser: {} as TourGuide,
  currentTourGuideList: { tourGuides: [], totalPage: 0 },
  isFetching: false,
};

const tourguideSlice = createSlice({
  name: "tourguide",
  initialState,
  reducers: {
    setCurrentUserTourGuide: (state, action: PayloadAction<TourGuide>) => {
      state.currentUser = action.payload;
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
        (state) => {
          state.isFetching = true;
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
  "tourguide/getTourGuideById",
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
>("tourguide/getRandomTourGuide", async (data, { rejectWithValue }) => {
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

export const { setCurrentUserTourGuide, setCurrentTourGuideList } =
  tourguideSlice.actions;

export default tourguideSlice.reducer;

export type GetTourGuideByIdParams = {
  tourGuideId: string;
};

export type GetRandomTourGuideParams = {
  page: string;
  pageSize: string;
};
