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
import { RequestTour } from "../models/order";
import { NavigateFunction } from "react-router-dom";

export function useOrder() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleCreateOrderTour = useCallback(
    async (value: CreateOrderTourParams, navigate: NavigateFunction) => {
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
    [dispatch, notification],
  );

  const handleCreateOrderTourGuide = useCallback(
    async (value: CreateOrderTourGuideParams, navigate: NavigateFunction) => {
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
    [dispatch, notification],
  );

  const handleNavigateToPayment = useCallback(
    async (value: RequestTour, navigate: NavigateFunction) => {
      dispatch(setRequestTour(value));
      navigate("/customer/payment");
    },
    [dispatch],
  );

  return {
    state,
    handleCreateOrderTour,
    handleCreateOrderTourGuide,
    handleNavigateToPayment,
  };
}
