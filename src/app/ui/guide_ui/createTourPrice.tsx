import { useEffect, useState } from "react";
import { Form, InputNumber, Table } from "antd";
import { TableProps } from "antd/es/table";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";

interface TourPrice {
  key: string;
  totalTouristFrom: number;
  totalTouristTo: number;
  adultPrice: number;
  childPrice: number;
}

const CreateTourPrice = ({ form }: { form: any }) => {
  const [initialData, setInitialData] = useState<TourPrice[]>([]);
  const [nextKey, setNextKey] = useState<number>(0);

  useEffect(() => {
    const initialValues: TourPrice[] = [
      {
        key: getKey(nextKey),
        totalTouristFrom: 0,
        totalTouristTo: 0,
        adultPrice: 0,
        childPrice: 0,
      },
    ];
    setInitialData(initialValues);
    form.setFieldsValue({ tourPriceDTOs: initialValues });
    setNextKey(nextKey + 1);
  }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values: any) => {
    const tourPrices = values.tourPriceDTOs.map((item: TourPrice) => ({
      totalTouristFrom: item.totalTouristFrom,
      totalTouristTo: item.totalTouristTo,
      adultPrice: item.adultPrice,
      childPrice: item.childPrice,
    }));
    console.log("Tour Prices: ", tourPrices);
    // Here you can send `tourPrices` to your backend or handle it as needed.
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddRow = () => {
    const newKey = nextKey;
    const newData: TourPrice = {
      key: getKey(newKey),
      totalTouristFrom: 0,
      totalTouristTo: 0,
      adultPrice: 0,
      childPrice: 0,
    };
    const updatedData = [...initialData, newData];
    setInitialData(updatedData);
    form.setFieldsValue({ tourPriceDTOs: updatedData });
    setNextKey(newKey + 1);
  };

  const handleDeleteRow = (record: TourPrice) => {
    if (initialData.length > 1) {
      const updatedData = initialData.filter((item) => item.key !== record.key);
      setInitialData(updatedData);
      form.setFieldsValue({ tourPriceDTOs: updatedData });
    }
  };

  const getKey = (index: number) => `tourPrice${index}`;

  const columns: TableProps<TourPrice>["columns"] = [
    {
      title: "From",
      dataIndex: "totalTouristFrom",
      key: "totalTouristFrom",
      render: (_, record, index) => (
        <Form.Item
          name={["tourPriceDTOs", index, "totalTouristFrom"]}
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <InputNumber
            min={1}
            value={record.totalTouristFrom}
            onChange={(value) => handleFieldChange(value, "totalTouristFrom", index)}
          />
        </Form.Item>
      ),
    },
    {
      title: "To",
      dataIndex: "totalTouristTo",
      key: "totalTouristTo",
      render: (_, record, index) => (
        <Form.Item
          name={["tourPriceDTOs", index, "totalTouristTo"]}
          rules={[
            { required: true, message: "Please input a value!" },
            {
              validator: (_, value) => {
                const fromValue = form.getFieldValue(["tourPriceDTOs", index, "totalTouristFrom"]);
                if (value <= fromValue) {
                  return Promise.reject(new Error("'To' is too low"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            min={1}
            value={record.totalTouristTo}
            onChange={(value) => handleFieldChange(value, "totalTouristTo", index)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Adult",
      dataIndex: "adultPrice",
      key: "adultPrice",
      render: (_, record, index) => (
        <Form.Item
          name={["tourPriceDTOs", index, "adultPrice"]}
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <InputNumber
            min={0}
            value={record.adultPrice}
            onChange={(value) => handleFieldChange(value, "adultPrice", index)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Child",
      dataIndex: "childPrice",
      key: "childPrice",
      render: (_, record, index) => (
        <Form.Item
          name={["tourPriceDTOs", index, "childPrice"]}
          rules={[{ required: true, message: "Please input a value!" }]}
        >
          <InputNumber
            min={0}
            value={record.childPrice}
            onChange={(value) => handleFieldChange(value, "childPrice", index)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Actions",
      render: (_, record, index) => (
        <>
          {initialData.length > 1 && index !== initialData.length - 1 ? (
            <MinusCircleFilled
              style={{ color: "red", fontSize: "2.5rem", cursor: "pointer" }}
              onClick={() => handleDeleteRow(record)}
            />
          ) : null}
          {index === initialData.length - 1 ? (
            <PlusCircleFilled
              style={{
                color: "#004AAD",
                fontSize: "2.5rem",
                marginLeft: 10,
                cursor: "pointer",
              }}
              onClick={handleAddRow}
            />
          ) : null}
        </>
      ),
    },
  ];

  const handleFieldChange = (value: any, fieldName: string, index: number) => {
    const updatedData = [...initialData];
    updatedData[index] = {
      ...updatedData[index],
      [fieldName]: value,
    };
    setInitialData(updatedData);
    form.setFieldsValue({ tourPriceDTOs: updatedData });
  };

  useEffect(() => {
    console.log("Current number of rows:", initialData.length);
    console.log("Current initialData:", initialData);
  }, [initialData]);

  return (
    <Form
      form={form}
      name="CreateTourPriceForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Table
        columns={columns}
        dataSource={initialData}
        pagination={false}
        rowKey="key"
      />
    </Form>
  );
};

export default CreateTourPrice;
