import { Form, InputNumber, Table } from "antd";
import { TableProps } from "antd/es/table";

interface TourPrice {
  totalTouristFrom: number;
  totalTouristTo: number;
  adultPrice: number;
  childPrice: number;
}

const CreateTourPrice = ({ form }: { form: any }) => {
  const onFinish = (values: any) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const columns: TableProps<TourPrice>["columns"] = [
    {
      title: "From",
      dataIndex: "totalTouristFrom",
      key: "totalTouristFrom",
      render: (_, record, index) => (
        <Form.Item
          name={[index, "totalTouristFrom"]}
          initialValue={record.totalTouristFrom}
        >
          <InputNumber min={1} />
        </Form.Item>
      ),
    },
    {
      title: "To",
      dataIndex: "totalTouristTo",
      key: "totalTouristTo",
      render: (_, record, index) => (
        <Form.Item
          name={[index, "totalTouristTo"]}
          initialValue={record.totalTouristTo}
        >
          <InputNumber min={1} />
        </Form.Item>
      ),
    },
    {
      title: "Adult",
      dataIndex: "adultPrice",
      key: "adultPrice",
      render: (_, record, index) => (
        <Form.Item
          name={[index, "adultPrice"]}
          initialValue={record.adultPrice}
        >
          <InputNumber min={0} />
        </Form.Item>
      ),
    },
    {
      title: "Child",
      dataIndex: "childPrice",
      key: "childPrice",
      render: (_, record, index) => (
        <Form.Item
          name={[index, "childPrice"]}
          initialValue={record.childPrice}
        >
          <InputNumber min={0} />
        </Form.Item>
      ),
    },
  ];

  // Example of initial values (you can adjust as needed)
  const initialValues = {
    tourPriceDTOs: [
      {
        key: "0",
        totalTouristFrom: 1,
        totalTouristTo: 5,
        adultPrice: 100,
        childPrice: 50,
      },
      {
        key: "1",
        totalTouristFrom: 6,
        totalTouristTo: 10,
        adultPrice: 90,
        childPrice: 45,
      },
    ],
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="CreateTourPriceForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Table
        columns={columns}
        dataSource={form.getFieldValue("tourPriceDTOs") || []}
        pagination={false}
        rowKey={(record: any) => record.key}
      />
    </Form>
  );
};

export default CreateTourPrice;