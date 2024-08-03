import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  GetTourFeedback,
  GetTourGuideFeedback,
  getTourFeedback,
  getTourGuideFeedback,
  setCurrentFeedbacks,
} from "../redux/slice/feedbackSlice";
import { useCallback } from "react";

export function useFeedback() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();

  const handleGetTourFeedback = useCallback(
    async (value: GetTourFeedback) => {
      const resultAction = await dispatch(getTourFeedback(value));
      if (getTourFeedback.fulfilled.match(resultAction)) {
        dispatch(setCurrentFeedbacks(resultAction.payload));
      } else {
        if (resultAction.payload) {
          // notification.error({
          //   message: "Error",
          //   description: `${resultAction.payload}`,
          //   placement: "topRight",
          // });
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

  const handleGetTourGuideFeedback = useCallback(
    async (value: GetTourGuideFeedback) => {
      const resultAction = await dispatch(getTourGuideFeedback(value));
      if (getTourGuideFeedback.fulfilled.match(resultAction)) {
        dispatch(setCurrentFeedbacks(resultAction.payload));
      } else {
        if (resultAction.payload) {
          // notification.error({
          //   message: "Error",
          //   description: `${resultAction.payload}`,
          //   placement: "topRight",
          // });
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
    handleGetTourFeedback,
    handleGetTourGuideFeedback,
  };
}
