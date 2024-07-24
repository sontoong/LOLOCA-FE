import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  getTourByCity,
  getTourById,
  GetTourByIdParams,
  getTourByTourGuide,
  GetTourByTourGuideParams,
  GetTourByCityParams,
  getTourRandom,
  GetTourRandomParams,
  setCurrentTour,
  setCurrentTourList,
  uploadTour,
  CreateTourParams,
  DeleteTourParams,
  deleteTour,
  updateTour,
  UpdateTourParams,
} from "../redux/slice/tourSlice";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";

export function useTour() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.tour);
  const dispatch = useAppDispatch();

  const handleGetTourRandom = useCallback(
    async (value: GetTourRandomParams) => {
      const resultAction = await dispatch(getTourRandom(value));
      if (getTourRandom.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourList(resultAction.payload));
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

  const handleGetTourByCityId = useCallback(
    async (value: GetTourByCityParams) => {
      const resultAction = await dispatch(getTourByCity(value));
      if (getTourByCity.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourList(resultAction.payload));
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
    [dispatch, notification],
  );

  const handleGetTourByTourGuide = useCallback(
    async (value: GetTourByTourGuideParams) => {
      const resultAction = await dispatch(getTourByTourGuide(value));
      if (getTourByTourGuide.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourList(resultAction.payload));
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

  const handleDeleteTour = useCallback(
    async (value: DeleteTourParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(deleteTour(value));
      if (deleteTour.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
        navigate("/guide/tours");
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

  const handleUploadTour = useCallback(
    async (tourData: CreateTourParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(uploadTour(tourData));
      if (uploadTour.fulfilled.match(resultAction)) {
        navigate("/guide/profile");
        notification.success({
          message: "Success",
          description: "Tour uploaded successfully",
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

  const handleUpdateTour = useCallback(
    async (tourData: UpdateTourParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(updateTour(tourData));
      if (updateTour.fulfilled.match(resultAction)) {
        navigate("/guide/profile");
        notification.success({
          message: "Success",
          description: "Tour updated successfully",
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

  return {
    state,
    handleGetTourById,
    handleGetTourRandom,
    handleGetTourByCityId,
    handleGetTourByTourGuide,
    handleUploadTour,
    handleDeleteTour,
    handleUpdateTour,
  };
}
