import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { FeedbackList } from "../../models/feedback";
import { excludedActionsPending } from "./uiSlice";

type TFeedback = {
  currentFeedbackList: {
    feedbacks: FeedbackList;
    totalFeedbacks: number;
    averageStar: number;
  };
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TFeedback = {
  currentFeedbackList: { feedbacks: [], averageStar: 0, totalFeedbacks: 0 },
  isFetching: false,
  isSending: false,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setCurrentFeedbacks: (state, action: PayloadAction<FeedbackList>) => {
      if (action.payload) {
        const averageStar =
          action.payload.reduce((acc, curr) => acc + curr.numOfStars, 0) /
          action.payload.length;
        state.currentFeedbackList = {
          feedbacks: action.payload,
          averageStar,
          totalFeedbacks: action.payload.length,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("feedback/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("feedback/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        (state) => {
          return { ...state, isSending: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("feedback/send/") &&
          action.type.endsWith("/fulfilled"),
        () => {
          return { ...initialState };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("feedback/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const getTourFeedback = createAsyncThunk<any, GetTourFeedback>(
  "feedback/fetch/getTourFeedback",
  async (data, { rejectWithValue }) => {
    const { tourId } = data;
    try {
      const response = await agent.Feedback.getTourFeedback(tourId);
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

export const getTourGuideFeedback = createAsyncThunk<any, GetTourGuideFeedback>(
  "feedback/fetch/getTourguideFeedback",
  async (data, { rejectWithValue }) => {
    const { cityId } = data;
    try {
      const response = await agent.Feedback.getTourguideFeedback(cityId);
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

export const { setCurrentFeedbacks } = feedbackSlice.actions;

export default feedbackSlice.reducer;

export type GetTourFeedback = {
  tourId: string;
};

export type GetTourGuideFeedback = {
  cityId: string;
};
