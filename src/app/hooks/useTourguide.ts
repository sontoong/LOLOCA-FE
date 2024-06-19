import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { NavigateFunction } from "react-router-dom";
import { App } from "antd";
import {
  getRandomTourGuide,
  GetRandomTourGuideParams,
  getTourGuideById,
  GetTourGuideByIdParams,
  setCurrentUserTourGuide,
  setCurrentTourGuideList,
} from "../redux/slice/tourguideSlice";
import { useCallback } from "react";

export function useTourGuide() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.tourguide);
  const dispatch = useAppDispatch();

  const handleGetTourGuidebyId = useCallback(
    async (value: GetTourGuideByIdParams) => {
      const resultAction = await dispatch(getTourGuideById(value));
      if (getTourGuideById.fulfilled.match(resultAction)) {
        dispatch(setCurrentUserTourGuide(resultAction.payload));
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

  const handleGetRandomTourGuides = useCallback(
    async (value: GetRandomTourGuideParams) => {
      const resultAction = await dispatch(getRandomTourGuide(value));
      if (getRandomTourGuide.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourGuideList(resultAction.payload));
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
    handleGetTourGuidebyId,
    handleGetRandomTourGuides,
  };
}
