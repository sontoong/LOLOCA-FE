import { useAppDispatch, useAppSelector } from "../redux/hook";
import { App } from "antd";
import {
  createDeposit,
  getDepositByCustomerId,
  setCurrentDepositList,
  CreateDepositParams,
  GetDepositByCustomerIdParams,
} from "../redux/slice/paymentSlice";
import { useCallback } from "react";
import { NavigateFunction } from "react-router-dom";

export function usePayment() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();

  const handleCreateDeposit = useCallback(
    async (value: CreateDepositParams, navigate: NavigateFunction) => {
      const resultAction = await dispatch(createDeposit(value));
      if (createDeposit.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: `${resultAction.payload}`,
          placement: "topRight",
        });
        navigate("/customer/payment-history");
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

  const handleGetDepositByCustomerId = useCallback(
    async (value: GetDepositByCustomerIdParams) => {
      const resultAction = await dispatch(getDepositByCustomerId(value));
      if (getDepositByCustomerId.fulfilled.match(resultAction)) {
        dispatch(setCurrentDepositList(resultAction.payload));
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
    handleCreateDeposit,
    handleGetDepositByCustomerId,
  };
}
