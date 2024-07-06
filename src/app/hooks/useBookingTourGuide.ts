import { App } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createBookingTourGuide,
  CreateBookingTourGuideParams,
  getBookingTourGuideByCustomerId,
  GetBookingTourGuideByCustomerIdParams,
  getBookingTourGuideByTourGuideId,
  GetBookingTourGuideByTourGuideIdParams,
  setCurrentBookingTourGuideList,
} from "../redux/slice/bookingTourGuideSlice";

export function useBookingTourGuide() {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.bookingTourGuide);
  const dispatch = useAppDispatch();

  const handleCreateBookingTourGuide = useCallback(
    async (value: CreateBookingTourGuideParams) => {
      const resultAction = await dispatch(createBookingTourGuide(value));
      if (createBookingTourGuide.fulfilled.match(resultAction)) {
        navigate("customer/booking-successful");
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
    [dispatch, notification, navigate],
  );

  const handleGetBookingTourGuideByCustomerId = useCallback(
    async (value: GetBookingTourGuideByCustomerIdParams) => {
      const resultAction = await dispatch(
        getBookingTourGuideByCustomerId(value),
      );
      if (getBookingTourGuideByCustomerId.fulfilled.match(resultAction)) {
        dispatch(setCurrentBookingTourGuideList(resultAction.payload));
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

  const handleGetBookingTourGuideByTourGuideId = useCallback(
    async (value: GetBookingTourGuideByTourGuideIdParams) => {
      const resultAction = await dispatch(
        getBookingTourGuideByTourGuideId(value),
      );
      if (getBookingTourGuideByTourGuideId.fulfilled.match(resultAction)) {
        dispatch(setCurrentBookingTourGuideList(resultAction.payload));
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
    handleCreateBookingTourGuide,
    handleGetBookingTourGuideByCustomerId,
    handleGetBookingTourGuideByTourGuideId,
  };
}
