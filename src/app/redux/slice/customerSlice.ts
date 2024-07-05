import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { Customer } from "../../models/customer";

type TCustomer = {
  currentCustomer: Customer;
  isFetching: boolean;
};

const initialState: TCustomer = {
  currentCustomer: {} as Customer,
  isFetching: false,
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
          action.type.startsWith("customer/") &&
          action.type.endsWith("/pending"),
        () => {
          return { ...initialState, isFetching: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("customer/") &&
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")),
        (state) => {
          state.isFetching = false;
        },
      );
  },
});

export const getCustomerById = createAsyncThunk<any, GetCustomerByIdParams>(
  "customer/getCustomerById",
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

export const updateCustomerInformation = createAsyncThunk<
  any,
  UpdateCustomerInformationParams
>("customer/updateCustomerInformation", async (data, { rejectWithValue }) => {
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
});

export const updateCustomerAvatar = createAsyncThunk<
  any,
  UpdateCustomerAvatarParams
>("customer/updateCustomerAvatar", async (data, { rejectWithValue }) => {
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

export const { setCurrentCustomer } = customerSlice.actions;

export default customerSlice.reducer;

export type GetCustomerByIdParams = {
  customerId: number;
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
