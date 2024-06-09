import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { NavigateFunction } from "react-router-dom";
import { App } from "antd";
import { useCallback } from "react";
import {
  getCities,
  getCityById,
  GetCityByIdParams,
  setCityList,
  setCurrentCity,
} from "../redux/slice/citySlice";

export function useCity() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleGetCities = useCallback(async () => {
    const resultAction = await dispatch(getCities());
    if (getCities.fulfilled.match(resultAction)) {
      dispatch(setCityList(resultAction.payload));
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
  }, [dispatch, notification]);

  const handleGetCityById = useCallback(
    async (values: GetCityByIdParams) => {
      const resultAction = await dispatch(getCityById(values));
      if (getCityById.fulfilled.match(resultAction)) {
        dispatch(setCurrentCity(resultAction.payload));
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
    handleGetCities,
    handleGetCityById,
  };
}
