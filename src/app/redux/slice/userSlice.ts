import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user";

interface IUser {
  currentUser: UserInfo;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: IUser = {
  currentUser: {} as UserInfo,
  isFetching: false,
  error: false,
  displayError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default userSlice.reducer;
