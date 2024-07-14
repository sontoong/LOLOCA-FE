import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { TourGuide, TourGuideList } from "../../models/tourGuide";
import { excludedActionsPending } from "./uiSlice";

type TTourGuide = {
  currentTourguide: TourGuide;
  currentTourGuideList: TourGuideList;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TTourGuide = {
  currentTourguide: {} as TourGuide,
  currentTourGuideList: { tourGuides: [], totalPage: 0 },
  isFetching: false,
  isSending: false,
};

const tourGuideSlice = createSlice({
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
          action.type.startsWith("tourGuide/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("tourGuide/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isSending: true };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("tourGuide/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const getTourGuideById = createAsyncThunk<any, GetTourGuideByIdParams>(
  "tourGuide/fetch/getTourGuideById",
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
      throw error;
    }
  },
);

export const getRandomTourGuide = createAsyncThunk<
  any,
  GetRandomTourGuideParams
>("tourGuide/fetch/getRandomTourGuide", async (data, { rejectWithValue }) => {
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
    throw error;
  }
});

export const getAllTourGuides = createAsyncThunk<any, GetAllTourGuideParams>(
  "tourGuide/fetch/getAllTourGuides",
  async (data, { rejectWithValue }) => {
    const { page, pageSize } = data;
    try {
      const response = await agent.TourGuide.getAllTourGuides({
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
      throw error;
    }
  },
);

export const getRandomTourGuideInCity = createAsyncThunk<
  any,
  GetRandomTourGuideInCityParams
>(
  "tourGuide/fetch/getRandomTourGuideInCity",
  async (data, { rejectWithValue }) => {
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
      throw error;
    }
  },
);

export const updateTourGuideInfo = createAsyncThunk<
  any,
  UpdateTourGuideInfoParams
>("tourGuide/send/updateTourGuideInfo", async (data, { rejectWithValue }) => {
  const { tourGuideId, ...rest } = data;
  try {
    const response = await agent.TourGuide.updateInfo(tourGuideId, rest);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const updateTourGuideAvatar = createAsyncThunk<
  any,
  UpdateTourGuideImageParams
>("tourGuide/send/updateTourGuideAvatar", async (data, { rejectWithValue }) => {
  const { TourGuideId, files } = data;
  const formData = new FormData();
  formData.append("TourGuideId", TourGuideId.toString());
  files.forEach((file) => {
    formData.append("files", file as File);
  });
  try {
    const response = await agent.TourGuide.updateAvatar(formData);
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

export const updateTourGuideCover = createAsyncThunk<
  any,
  UpdateTourGuideImageParams
>("tourGuide/send/updateTourGuideCover", async (data, { rejectWithValue }) => {
  const { TourGuideId, files } = data;
  const formData = new FormData();
  formData.append("TourGuideId", TourGuideId.toString());
  files.forEach((file) => {
    formData.append("files", file as File);
  });
  try {
    const response = await agent.TourGuide.updateCover(formData);
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
  tourGuideSlice.actions;

export default tourGuideSlice.reducer;

export type UpdateTourGuideImageParams = {
  files: File[];
  TourGuideId: number;
};

export type GetTourGuideByIdParams = {
  tourGuideId: string;
};

export type GetRandomTourGuideParams = {
  page: number;
  pageSize: number;
};

export type GetAllTourGuideParams = {
  page: number;
  pageSize: number;
};

export type GetRandomTourGuideInCityParams = {
  page: number;
  pageSize: number;
  CityId: number;
};

export type UpdateTourGuideInfoParams = {
  tourGuideId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: number;
  phoneNumber: string;
  description: string;
  address: string;
  zaloLink: string;
  facebookLink: string;
  instagramLink: string;
  pricePerDay: number;
  status: number;
};
