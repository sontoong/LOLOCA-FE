import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { NavigateFunction } from "react-router-dom";
import { App } from "antd";
import {
  getTourguideById,
  setCurrentTourguide,
} from "../redux/slice/tourguideSlice";

export function useTourguide() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.tourguide);
  const dispatch = useAppDispatch();

  const handleGetTourguidebyId = async (value: GetTourguideByIdParams) => {
    const resultAction = await dispatch(getTourguideById(value));
    if (getTourguideById.fulfilled.match(resultAction)) {
      dispatch(setCurrentTourguide(resultAction.payload));
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
  };

  return {
    state,
    handleGetTourguidebyId,
  };
}

export type GetTourguideByIdParams = {
  tourGuideId: string;
};
