import { PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import Radio from "../../components/radio/Radio";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PendingPaymentTable from "../../ui/customer_ui/PendingPaymentTable";
import HistoryPaymentTable from "../../ui/customer_ui/HistoryPaymentTable";
import RejectedPaymentTable from "../../ui/customer_ui/RejectedPaymentTable";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [type, setType] = useState<RenderData>();

  const onAddFund = () => {
    navigate("/customer/add-fund");
  };

  const data = [
    {
      key: '1',
      amount: '$100.00',
      transactionalCode: 'TXN001',
      requestDate: '2024-07-14',
      status: 0
    },
    {
      key: '2',
      amount: '$200.00',
      transactionalCode: 'TXN002',
      requestDate: '2024-07-15',
      status: 1
    },
    {
      key: '3',
      amount: '$300.00',
      transactionalCode: 'TXN003',
      requestDate: '2024-07-16',
      status: 2
    },
  ];

  const renderTable = () => {
    switch (type?.type) {
      case "pending":
        return <PendingPaymentTable data={data}/>;
      case "history":
        return <HistoryPaymentTable data={data}/>;
      case "rejected":
          return <RejectedPaymentTable data={data}/>;
      default:
        return <HistoryPaymentTable data={data}/>;
    }
  };

  return (
    <div className="mx-[4rem] my-[2rem]">
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
            {
              text: "Rejected",
              onClick: () => {
                setType({ type: "rejected" });
              },
            },
          ]}
          activeRender={(item) => <OutlineButton text={item?.text} />}
          render={(item) => (
            <PrimaryButton text={item?.text} onClick={item?.onClick} />
          )}
        />
        <PrimaryButton
          text="Add Fund"
          icon={<PlusOutlined />}
          onClick={onAddFund}
        />
      </div>
      {renderTable()}
    </div>
  );
}

type RenderData = { type: "pending" | "history"  | "rejected"};
