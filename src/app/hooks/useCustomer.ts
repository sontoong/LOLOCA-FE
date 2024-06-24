import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { NavigateFunction } from "react-router-dom";
import { App } from "antd";
import {
  getCustomerById,
  GetCustomerByIdParams,
  setCurrentCustomer,
} from "../redux/slice/customerSlice";
import { useCallback } from "react";

export function useCustomer() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();

  const handleGetCustomerbyId = useCallback(
    async (value: GetCustomerByIdParams) => {
      const resultAction = await dispatch(getCustomerById(value));
      if (getCustomerById.fulfilled.match(resultAction)) {
        dispatch(setCurrentCustomer(resultAction.payload));
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
    handleGetCustomerbyId,
  };
}
