import { App } from "antd";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createBookingTour,
  CreateBookingTourParams,
  getBookingTourByCustomerId,
  GetBookingTourByCustomerIdParams,
  getBookingTourById,
  GetBookingTourByIdParams,
  getBookingTourByTourGuideId,
  GetBookingTourByTourGuideIdParams,
  setCurrentBookingTour,
  setCurrentBookingTourList,
} from "../redux/slice/bookingTourSlice";

export function useBookingTour() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.bookingTour);
  const dispatch = useAppDispatch();

  const handleCreateBookingTour = useCallback(
    async (value: CreateBookingTourParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(createBookingTour(value));
      if (createBookingTour.fulfilled.match(resultAction)) {
        navigate("/customer/booking-successful");
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Error",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Error",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  const handleGetBookingTourByCustomerId = useCallback(
    async (value: GetBookingTourByCustomerIdParams) => {
      const resultAction = await dispatch(getBookingTourByCustomerId(value));
      if (getBookingTourByCustomerId.fulfilled.match(resultAction)) {
        dispatch(setCurrentBookingTourList(resultAction.payload));
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Error",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Error",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  const handleGetBookingTourByTourGuideId = useCallback(
    async (value: GetBookingTourByTourGuideIdParams) => {
      const resultAction = await dispatch(getBookingTourByTourGuideId(value));
      if (getBookingTourByTourGuideId.fulfilled.match(resultAction)) {
        dispatch(setCurrentBookingTourList(resultAction.payload));
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Error",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Error",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  const handleGetBookingTourById = useCallback(
    async (value: GetBookingTourByIdParams) => {
      const resultAction = await dispatch(getBookingTourById(value));
      if (getBookingTourById.fulfilled.match(resultAction)) {
        dispatch(setCurrentBookingTour(resultAction.payload));
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Error",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Error",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  return {
    state,
    handleCreateBookingTour,
    handleGetBookingTourByCustomerId,
    handleGetBookingTourByTourGuideId,
    handleGetBookingTourById,
  };
}
