import { CheckSquareOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import Radio from "../../components/radio/Radio";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PendingPaymentTable from "../../ui/guide_ui/PendingPaymentTable";
import HistoryPaymentTable from "../../ui/guide_ui/HistoryPaymentTable";
import { useAuth } from "../../hooks/useAuth";
import { Customer } from "../../models/customer";
import { formatCurrency } from "../../utils/utils";
import { Typography } from "antd";
import { usePayment } from "../../hooks/usePayment";

const { Title } = Typography;

export default function PaymentHistory() {
  const navigate = useNavigate();
  const { state: stateAuth } = useAuth();
  const { state: statePayment } = usePayment();
  const [type, setType] = useState<RenderData>({ type: "pending" });

  const currentUser = stateAuth.currentUser as Customer;

  const renderTable = () => {
    switch (type?.type) {
      case "pending":
        return <PendingPaymentTable loading={statePayment.isFetching} />;
      case "history":
        return <HistoryPaymentTable loading={statePayment.isFetching} />;
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
          text="Rút tiền"
          icon={<CheckSquareOutlined />}
          onClick={() => navigate("/withdraw")}
        />
      </div>
      {renderTable()}
    </div>
  );
}

type RenderData = { type: "pending" | "history" };
