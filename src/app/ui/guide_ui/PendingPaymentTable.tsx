import { TableProps } from "antd";
import { useEffect } from "react";
import { Table } from "../../components/table";
import { usePayment } from "../../hooks/usePayment";
import { paymentStatusGenerator } from "../../utils/generators/paymentStatus";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";

const PendingPaymentTable = ({
  loading,
}: {
  loading?: TableProps["loading"];
}) => {
  const { state: statePayment, handleGetDepositByTourGuideId } = usePayment();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      handleGetDepositByTourGuideId({ tourGuideId: userId, status: 0 });
    }
  }, [handleGetDepositByTourGuideId]);

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
    <Table
      columns={columns}
      dataSource={statePayment.currentDepositList}
      loading={loading}
      rowKey={(record) => record.paymentId}
    />
  );
};

export default PendingPaymentTable;
