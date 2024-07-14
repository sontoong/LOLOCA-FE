import { Table } from "../../components/table";

const RejectedPaymentTable = ({ data } : {data : any}) => {
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

  const filteredData = data.filter((item : any) => item.status === 2);

  return (
    <div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default RejectedPaymentTable;
