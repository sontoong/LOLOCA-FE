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

export const uploadTour = createAsyncThunk<any, CreateTourParams>(
  "tour/uploadTour",
  async (data, { rejectWithValue }) => {
    const {
      images,
      Activity,
      AdultPrices,
      Category,
      ChildPrices,
      CityId,
      Description,
      Duration,
      ExcludeDetails,
      HighlightDetails,
      IncludeDetails,
      ItineraryNames,
      ItineraryDescriptions,
      Name,
      TourGuideId,
      TotalTouristFrom,
      TotalTouristTo,
      TypeDetails,
    } = data;
    const formData = new FormData();
    formData.append("TourGuideId", TourGuideId.toString());
    formData.append("CityId", CityId.toString());
    formData.append("Name", Name);
    formData.append("Description", Description);
    formData.append("Category", Category);
    formData.append("Activity", Activity);
    formData.append("Duration", Duration.toString());

    ExcludeDetails.forEach((detail) =>
      formData.append("ExcludeDetails[]", detail),
    );
    HighlightDetails.forEach((detail) =>
      formData.append("HighlightDetails[]", detail),
    );
    IncludeDetails.forEach((detail) =>
      formData.append("IncludeDetails[]", detail),
    );
    ItineraryNames.forEach((name) => formData.append("ItineraryNames[]", name));
    ItineraryDescriptions.forEach((description) =>
      formData.append("ItineraryDescriptions[]", description),
    );
    TypeDetails.forEach((type) => formData.append("TypeDetails[]", type));
    TotalTouristFrom.forEach((total) =>
      formData.append("TotalTouristFrom[]", total.toString()),
    );
    TotalTouristTo.forEach((total) =>
      formData.append("TotalTouristTo[]", total.toString()),
    );
    AdultPrices.forEach((price) => formData.append("AdultPrices[]", price.toString()));
    ChildPrices.forEach((price) => formData.append("ChildPrices[]", price.toString()));

    images.forEach((file) => {
      formData.append("images", file as File);
    });
    try {
      const response = await agent.Tour.uploadTour(formData);
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

export const { setCurrentTour, setCurrentTourList } = tourSlice.actions;

export default tourSlice.reducer;

export type GetTourRandomParams = {
  page: number;
  pageSize: number;
};

export type CreateTourParams = {
  CityId: number;
  TourGuideId: number;
  Name: string;
  Description: string;
  Category: string;
  Activity: string;
  Duration: number;
  ExcludeDetails: string[];
  HighlightDetails: string[];
  IncludeDetails: string[];
  ItineraryNames: string[];
  ItineraryDescriptions: string[];
  TypeDetails: string[];
  TotalTouristFrom: number[];
  TotalTouristTo: number[];
  AdultPrices: number[];
  ChildPrices: number[];
  images: File[];
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
  TourGuideId: string;
  page: number;
  pageSize: number;
};
