import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  getRandomTourGuide,
  GetRandomTourGuideParams,
  getTourGuideById,
  GetTourGuideByIdParams,
  setCurrentTourGuideList,
  getRandomTourGuideInCity,
  GetRandomTourGuideInCityParams,
  setCurrentTourGuide,
  UpdateTourGuideInfoParams,
  updateTourGuideInfo,
  updateTourGuideAvatar,
  updateTourGuideCover,
  UpdateTourGuideImageParams,
  getAllTourGuides,
  GetAllTourGuideParams,
  getTourGuidePrivateById,
  GetTourGuidePrivateByIdParams,
  acceptBookingTourRequest,
  AcceptBookingTourRequestParams,
  rejectBookingTourRequest,
  RejectBookingTourRequestParams,
  acceptBookingTourGuideRequest,
  AcceptBookingTourGuideRequestParams,
  rejectBookingTourGuideRequest,
  RejectBookingTourGuideRequestParams,
} from "../redux/slice/tourguideSlice";
import { useCallback } from "react";

export function useTourGuide() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.tourGuide);
  const dispatch = useAppDispatch();

  const handleGetTourGuideById = useCallback(
    async (value: GetTourGuideByIdParams) => {
      const resultAction = await dispatch(getTourGuideById(value));
      if (getTourGuideById.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourGuide(resultAction.payload));
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

  const handleGetTourGuidePrivateById = useCallback(
    async (value: GetTourGuidePrivateByIdParams) => {
      const resultAction = await dispatch(getTourGuidePrivateById(value));
      if (getTourGuidePrivateById.fulfilled.match(resultAction)) {
        dispatch(setCurrentTourGuide(resultAction.payload));
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

  const handleGetAllTourGuides = useCallback(
    async (value: GetAllTourGuideParams) => {
      const resultAction = await dispatch(getAllTourGuides(value));
      if (getAllTourGuides.fulfilled.match(resultAction)) {
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

  const handleGetRandomTourGuidesInCity = useCallback(
    async (value: GetRandomTourGuideInCityParams) => {
      const resultAction = await dispatch(getRandomTourGuideInCity(value));
      if (getRandomTourGuideInCity.fulfilled.match(resultAction)) {
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

  const handleUpdateTourGuideInfo = useCallback(
    async (value: UpdateTourGuideInfoParams) => {
      const resultAction = await dispatch(updateTourGuideInfo(value));
      if (updateTourGuideInfo.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Tour guide information updated successfully",
          placement: "topRight",
        });
        dispatch(setCurrentTourGuide(resultAction.payload));
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

  const handleUpdateTourGuideAvatar = useCallback(
    async (formData: UpdateTourGuideImageParams) => {
      const resultAction = await dispatch(updateTourGuideAvatar(formData));
      if (updateTourGuideAvatar.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Avatar updated successfully",
          placement: "topRight",
        });
        dispatch(setCurrentTourGuide(resultAction.payload));
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

  const handleUpdateTourguideCover = useCallback(
    async (formData: UpdateTourGuideImageParams) => {
      const resultAction = await dispatch(updateTourGuideCover(formData));
      if (updateTourGuideCover.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Cover updated successfully",
          placement: "topRight",
        });
        dispatch(setCurrentTourGuide(resultAction.payload));
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

  const handleAcceptBookingTourRequest = useCallback(
    async (value: AcceptBookingTourRequestParams) => {
      const resultAction = await dispatch(acceptBookingTourRequest(value));
      if (acceptBookingTourRequest.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: resultAction.payload,
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

  const handleRejectBookingTourRequest = useCallback(
    async (value: RejectBookingTourRequestParams) => {
      const resultAction = await dispatch(rejectBookingTourRequest(value));
      if (rejectBookingTourRequest.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: resultAction.payload,
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

  const handleAcceptBookingTourGuideRequest = useCallback(
    async (value: AcceptBookingTourGuideRequestParams) => {
      const resultAction = await dispatch(acceptBookingTourGuideRequest(value));
      if (acceptBookingTourGuideRequest.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: resultAction.payload,
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

  const handleRejectBookingTourGuideRequest = useCallback(
    async (value: RejectBookingTourGuideRequestParams) => {
      const resultAction = await dispatch(rejectBookingTourGuideRequest(value));
      if (rejectBookingTourGuideRequest.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: resultAction.payload,
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
    handleGetTourGuideById,
    handleGetTourGuidePrivateById,
    handleGetRandomTourGuides,
    handleGetRandomTourGuidesInCity,
    handleUpdateTourGuideInfo,
    handleUpdateTourGuideAvatar,
    handleUpdateTourguideCover,
    handleGetAllTourGuides,
    handleAcceptBookingTourRequest,
    handleRejectBookingTourRequest,
    handleAcceptBookingTourGuideRequest,
    handleRejectBookingTourGuideRequest,
  };
}
