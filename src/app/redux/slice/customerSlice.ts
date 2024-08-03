import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { Customer } from "../../models/customer";
import { excludedActionsPending } from "./uiSlice";

type TCustomer = {
  currentCustomer: Customer;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TCustomer = {
  currentCustomer: {} as Customer,
  isFetching: false,
  isSending: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCurrentCustomer: (state, action: PayloadAction<Customer>) => {
      state.currentCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        (state) => {
          return { ...state, isSending: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/send/") &&
          action.type.endsWith("/fulfilled") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return { ...initialState };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("customer/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const getCustomerById = createAsyncThunk<any, GetCustomerByIdParams>(
  "customer/fetch/getCustomerById",
  async (data, { rejectWithValue }) => {
    const { customerId } = data;
    try {
      const response = await agent.Customer.getCustomerById(customerId);
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

export const getCustomerPrivateById = createAsyncThunk<
  any,
  GetCustomerPrivateByIdParams
>(
  "customer/fetch/getCustomerPrivateById",
  async (data, { rejectWithValue }) => {
    const { customerId } = data;
    try {
      const response = await agent.Customer.getPrivate(customerId);
      return response;
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const updateCustomerInformation = createAsyncThunk<
  any,
  UpdateCustomerInformationParams
>(
  "customer/send/updateCustomerInformation",
  async (data, { rejectWithValue }) => {
    const {
      customerId,
      addressCustomer,
      dateOfBirth,
      firstName,
      gender,
      lastName,
      phoneNumber,
    } = data;
    try {
      const response = await agent.Customer.updateInfo(customerId, {
        addressCustomer,
        dateOfBirth,
        firstName,
        gender,
        lastName,
        phoneNumber,
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

export const updateCustomerAvatar = createAsyncThunk<
  any,
  UpdateCustomerAvatarParams
>("customer/send/updateCustomerAvatar", async (data, { rejectWithValue }) => {
  const { CustomerId, files } = data;
  const formData = new FormData();
  formData.append("CustomerId", CustomerId.toString());
  files.forEach((file) => {
    formData.append("files", file as File);
  });
  try {
    const response = await agent.Customer.updateAvatar(formData);
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

export const changeStatusBookingTour = createAsyncThunk<
  any,
  ChangeStatusBookingTourParams
>(
  "customer/send/changeStatusBookingTour",
  async (data, { rejectWithValue }) => {
    const { bookingTourRequestId } = data;
    try {
      const response = await agent.Customer.changeStatusBookingTour({
        bookingTourRequestId,
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

export const changeStatusBookingTourGuide = createAsyncThunk<
  any,
  ChangeStatusBookingTourGuideParams
>(
  "customer/send/changeStatusBookingTourGuide",
  async (data, { rejectWithValue }) => {
    const { bookingTourGuideRequestId } = data;
    try {
      const response = await agent.Customer.changeStatusBookingTourGuide({
        bookingTourGuideRequestId,
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

export const { setCurrentCustomer } = customerSlice.actions;

export default customerSlice.reducer;

export type GetCustomerByIdParams = {
  customerId: number;
};

export type GetCustomerPrivateByIdParams = {
  customerId: string;
};

export type UpdateCustomerInformationParams = {
  customerId: string;
  firstName: string;
  lastName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  addressCustomer: string;
};

export type UpdateCustomerAvatarParams = {
  files: File[];
  CustomerId: number;
};

export type ChangeStatusBookingTourParams = {
  bookingTourRequestId: string;
};

export type ChangeStatusBookingTourGuideParams = {
  bookingTourGuideRequestId: string;
};
