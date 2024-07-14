import { Table } from "../../components/table";

const HistoryPaymentTable = ({ data } : {data : any}) => {
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Transactional Code',
      dataIndex: 'transactionalCode',
      key: 'transactionalCode',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
  ];

  const filteredData = data.filter((item : any) => item.status === 1 && 2);

  return (
    <div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default HistoryPaymentTable;
