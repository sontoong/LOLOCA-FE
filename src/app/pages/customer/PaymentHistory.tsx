import { PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import Radio from "../../components/radio/Radio";
import { Table } from "../../components/table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [type, setType] = useState<RenderData>();

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const onAddFund = () => {
    navigate("/customer/add-fund");
  };

  const renderTable = () => {
    switch (type?.type) {
      case "pending":
        return <Table columns={columns} />;
      case "history":
        return <Table columns={columns} />;
      default:
        return <Table columns={columns} />;
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

type RenderData = { type: "pending" | "history" };
