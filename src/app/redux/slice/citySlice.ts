import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { City, CityList } from "../../models/city";

type TCity = {
  currentCity: City;
  cityList: CityList;
  isFetching: boolean;
};

const initialState: TCity = {
  currentCity: {} as City,
  cityList: [],
  isFetching: false,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCityList: (state, action) => {
      state.cityList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("city/") && action.type.endsWith("/pending"),
        (state) => {
          state.isFetching = true;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("city/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const getCities = createAsyncThunk<any>(
  "city/getAllCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Cities.getCities();
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

export const getCityById = createAsyncThunk<any, GetCityByIdParams>(
  "city/getCityById",
  async (values, { rejectWithValue }) => {
    const { cityId } = values;
    try {
      const response = await agent.Cities.getCityById(cityId);
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

export const { setCurrentCity, setCityList } = citySlice.actions;

export default citySlice.reducer;

export type GetCityByIdParams = {
  cityId: string;
};
