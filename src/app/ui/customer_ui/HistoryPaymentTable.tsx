import { TableProps } from "antd";
import { Table } from "../../components/table";
import { DepositList } from "../../models/payment";
import { paymentStatusGenerator } from "../../utils/generators/paymentStatus";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";

const HistoryPaymentTable = ({
  data,
  loading,
}: {
  data: DepositList;
  loading?: TableProps["loading"];
}) => {
  const columns = [
    {
      title: "Mã GD",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: "Transactional Code",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date: string) => formatDateToLocal(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => paymentStatusGenerator(status),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.paymentId}
      />
    </div>
  );
};

export default HistoryPaymentTable;
