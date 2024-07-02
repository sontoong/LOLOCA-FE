import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { NavigateFunction } from "react-router-dom";
import { App } from "antd";
import {
  getCustomerById,
  GetCustomerByIdParams,
  setCurrentCustomer,
  updateCustomerAvatar,
  UpdateCustomerAvatarParams,
  updateCustomerInformation,
  UpdateCustomerInformationParams,
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

  const handleUpdateCustomerInformation = useCallback(
    async (value: UpdateCustomerInformationParams) => {
      const resultAction = await dispatch(updateCustomerInformation(value));
      if (updateCustomerInformation.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Update thông tin thành công",
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

  const handleUpdateCustomerAvatar = useCallback(
    async (value: UpdateCustomerAvatarParams) => {
      const resultAction = await dispatch(updateCustomerAvatar(value));
      if (updateCustomerAvatar.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "Update avatar thành công",
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
    handleGetCustomerbyId,
    handleUpdateCustomerInformation,
    handleUpdateCustomerAvatar,
  };
}
