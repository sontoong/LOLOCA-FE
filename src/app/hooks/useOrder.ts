import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  createOrderTour,
  createOrderTourGuide,
  CreateOrderTourGuideParams,
  CreateOrderTourParams,
  setRequestTour,
} from "../redux/slice/orderSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RequestTour } from "../models/order";

export function useOrder() {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleCreateOrderTour = useCallback(
    async (value: CreateOrderTourParams) => {
      const resultAction = await dispatch(createOrderTour(value));
      if (createOrderTour.fulfilled.match(resultAction)) {
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
    [dispatch, navigate, notification],
  );

  const handleCreateOrderTourGuide = useCallback(
    async (value: CreateOrderTourGuideParams) => {
      const resultAction = await dispatch(createOrderTourGuide(value));
      if (createOrderTourGuide.fulfilled.match(resultAction)) {
        navigate(-1);
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
    [dispatch, navigate, notification],
  );

  const handleNavigateToPayment = useCallback(
    async (value: RequestTour) => {
      dispatch(setRequestTour(value));
      navigate("/customer/payment");
    },
    [dispatch, navigate],
  );

  return {
    state,
    handleCreateOrderTour,
    handleCreateOrderTourGuide,
    handleNavigateToPayment,
  };
}
