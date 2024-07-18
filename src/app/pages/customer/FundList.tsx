import { PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import Radio from "../../components/radio/Radio";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PendingPaymentTable from "../../ui/customer_ui/PendingPaymentTable";
import HistoryPaymentTable from "../../ui/customer_ui/HistoryPaymentTable";
import { useAuth } from "../../hooks/useAuth";
import { Customer } from "../../models/customer";
import { formatCurrency } from "../../utils/utils";
import { Typography } from "antd";
import { usePayment } from "../../hooks/usePayment";

const { Title } = Typography;

export default function PaymentHistory() {
  const navigate = useNavigate();
  const { state: stateAuth } = useAuth();
  const { state: statePayment, handleGetDepositByCustomerId } = usePayment();
  const [type, setType] = useState<RenderData>({ type: "pending" });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      handleGetDepositByCustomerId({ customerId: userId, status: 0 });
    }
  }, [handleGetDepositByCustomerId]);

  const currentUser = stateAuth.currentUser as Customer;

  const onAddFund = () => {
    navigate("/customer/add-fund");
  };

  const renderTable = () => {
    switch (type?.type) {
      case "pending":
        return (
          <PendingPaymentTable
            data={statePayment.currentDepositList
              .filter((item: any) => item.status === 0)
              .reverse()}
            loading={statePayment.isFetching}
          />
        );
      case "history":
        return (
          <HistoryPaymentTable
            data={statePayment.currentDepositList
              .filter((item: any) => item.status === 1 && 2)
              .reverse()}
            loading={statePayment.isFetching}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-[4rem] my-[2rem]">
      <Title level={2}>
        Số tiền hiện tại của bạn: {formatCurrency(currentUser.balance)}
      </Title>
      <div className="mb-[2rem] flex justify-between">
        <Radio.ButtonGroup
          defaultActiveIndex={0}
          items={[
            {
              text: "Pending",
              onClick: () => {
                setType({ type: "pending" });
              },
            },
            {
              text: "History",
              onClick: () => {
                setType({ type: "history" });
              },
            },
          ]}
          activeRender={(item) => <OutlineButton text={item?.text} />}
          render={(item) => (
            <PrimaryButton text={item?.text} onClick={item?.onClick} />
          )}
        />
        <PrimaryButton
          text="Nạp thêm"
          icon={<PlusOutlined />}
          onClick={onAddFund}
        />
      </div>
      {renderTable()}
    </div>
  );
}

type RenderData = { type: "pending" | "history" };
