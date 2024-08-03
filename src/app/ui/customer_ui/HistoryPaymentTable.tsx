import { TableProps } from "antd";
import { Table } from "../../components/table";
import { paymentStatusGenerator } from "../../utils/generators/paymentStatus";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";
import { usePayment } from "../../hooks/usePayment";
import { useEffect } from "react";

const HistoryPaymentTable = ({
  loading,
}: {
  loading?: TableProps["loading"];
}) => {
  const { state: statePayment, handleGetDepositByCustomerId } = usePayment();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      handleGetDepositByCustomerId({ customerId: userId, status: 1 });
    }
  }, [handleGetDepositByCustomerId]);

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
        dataSource={statePayment.currentDepositList}
        loading={loading}
        rowKey={(record) => record.paymentId}
      />
    </div>
  );
};

export default HistoryPaymentTable;
