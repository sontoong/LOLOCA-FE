import { App } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createBookingTour,
  CreateBookingTourParams,
  getBookingTourByCustomerId,
  GetBookingTourByCustomerIdParams,
} from "../redux/slice/bookingTourSlice";

export function useBookingTour() {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.bookingTour);
  const dispatch = useAppDispatch();

  const handleCreateBookingTour = useCallback(
    async (value: CreateBookingTourParams) => {
      const resultAction = await dispatch(createBookingTour(value));
      if (createBookingTour.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Tạo tour thành công",
          placement: "topRight",
        });
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

  return {
    state,
    handleCreateBookingTour,
    handleGetBookingTourByCustomerId,
  };
}
