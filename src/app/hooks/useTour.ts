import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  getTourByCity,
  getTourById,
  GetTourByIdParams,
  GetTourCityParams,
  getTourRandom,
  GetTourRandomParams,
  setCurrentTour,
  setRandomCitylist,
  setRandomTourlist,
} from "../redux/slice/tourSlice";
import { useCallback } from "react";

export function useTour() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.tour);
  const dispatch = useAppDispatch();

  const handleGetTourRandom = useCallback(
    async (value: GetTourRandomParams) => {
      const resultAction = await dispatch(getTourRandom(value));
      if (getTourRandom.fulfilled.match(resultAction)) {
        dispatch(setRandomTourlist(resultAction.payload));
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
    [dispatch, notification]
  );

  const handleGetTourByCityId = useCallback(
    async (value: GetTourCityParams) => {
      const resultAction = await dispatch(getTourByCity(value));
      if (getTourByCity.fulfilled.match(resultAction)) {
        dispatch(setRandomCitylist(resultAction.payload));
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
    [dispatch, notification]
  );

  const handleGetTourById = useCallback(
    async (value: GetTourByIdParams) => {
      const resultAction = await dispatch(getTourById(value));
      if (getTourById.fulfilled.match(resultAction)) {
        dispatch(setCurrentTour(resultAction.payload));
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
    [dispatch, notification]
  );

  return {
    state,
    handleGetTourById,
    handleGetTourRandom,
    handleGetTourByCityId,
  };
}
