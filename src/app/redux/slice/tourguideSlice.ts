import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tourguide } from "../../models/user";
import agent from "../../utils/agent";
import { GetTourguideByIdParams } from "../../hooks/useTourguide";
import { AxiosError } from "axios";

type TTourguide = {
  currentTourguide: Tourguide;
  isFetching: boolean;
};

const initialState: TTourguide = {
  currentTourguide: {} as Tourguide,
  isFetching: false,
};

const tourguideSlice = createSlice({
  name: "tourguide",
  initialState,
  reducers: {
    setCurrentTourguide: (state, action: PayloadAction<Tourguide>) => {
      state.currentTourguide = action.payload;
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
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tourguide/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        }
      );
  },
});

export const getTourguideById = createAsyncThunk<any, GetTourguideByIdParams>(
  "tourguide/getTourguideById",
  async (data, { rejectWithValue }) => {
    const { tourGuideId } = data;
    try {
      const response = await agent.TourGuide.getTourguideById(tourGuideId);
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

export const { setCurrentTourguide } = tourguideSlice.actions;

export default tourguideSlice.reducer;
