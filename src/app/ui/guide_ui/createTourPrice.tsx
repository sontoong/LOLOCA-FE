import { useMemo, useEffect } from "react";
import { Form, InputNumber, Typography } from "antd";
import { MinusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";

interface TourPrice {
  TotalTouristFrom: number;
  TotalTouristTo: number;
  AdultPrices: number;
  ChildPrices: number;
}

const { Title } = Typography;

const CreateTourPrice = ({
  form,
  initialValues,
}: {
  form: any;
  initialValues: any;
}) => {
  const initialAdultPrices = useMemo(
    () => initialValues.AdultPrices || [0],
    [initialValues.AdultPrices]
  );
  const initialChildPrices = useMemo(
    () => initialValues.ChildPrices || [0],
    [initialValues.ChildPrices]
  );
  const initialTotalTouristFrom = useMemo(
    () => initialValues.TotalTouristFrom || [0],
    [initialValues.TotalTouristFrom]
  );
  const initialTotalTouristTo = useMemo(
    () => initialValues.TotalTouristTo || [0],
    [initialValues.TotalTouristTo]
  );

  const initialData = useMemo(() => {
    const maxLength = Math.max(
      initialAdultPrices.length,
      initialChildPrices.length,
      initialTotalTouristFrom.length,
      initialTotalTouristTo.length
    );
    const data: TourPrice[] = [];
    for (let i = 0; i < maxLength; i++) {
      data.push({
        TotalTouristFrom: initialTotalTouristFrom[i] || 0,
        TotalTouristTo: initialTotalTouristTo[i] || 0,
        AdultPrices: initialAdultPrices[i] || 0,
        ChildPrices: initialChildPrices[i] || 0,
      });
    }
    return data;
  }, [initialAdultPrices, initialChildPrices, initialTotalTouristFrom, initialTotalTouristTo]);

  useEffect(() => {
    form.setFieldsValue({
      prices: initialData,
    });
  }, [form, initialData]);

  const onFinish = (values: any) => {
    const formattedValues = {
      AdultPrices: values.prices.map((item: any) => item.AdultPrices),
      ChildPrices: values.prices.map((item: any) => item.ChildPrices),
      TotalTouristFrom: values.prices.map((item: any) => item.TotalTouristFrom),
      TotalTouristTo: values.prices.map((item: any) => item.TotalTouristTo),
    };
    console.log("Formatted Form Values: ", formattedValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            From
          </Title>
        </div>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            To
          </Title>
        </div>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            Adult Prices
          </Title>
        </div>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 8 }}>
            Child Prices
          </Title>
        </div>
      </div>
      <Form
        form={form}
        name="CreateTourPriceForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List
          name="price"
          initialValue={[
            { TotalTouristFrom: 0, TotalTouristTo: 0, AdultPrices: 0, ChildPrices: 0 },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Form.Item
                    name={[field.name, "TotalTouristFrom"]}
                    rules={[{ required: true }]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="From" min={0} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "TotalTouristTo"]}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const fromValue = getFieldValue([
                            "price",
                            index,
                            "TotalTouristFrom",
                          ]);
                          if (!value || fromValue === undefined || value > fromValue) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("'To' value must be greater than 'From'"),
                          );
                        },
                      }),
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="To" min={0} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "AdultPrices"]}
                    rules={[
                      { required: true },
                      {
                        validator(_, value) {
                          if (value === 0 || value >= 1000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Price must be 0 or at least 1000")
                          );
                        },
                      },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="Adult Prices" min={0} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "ChildPrices"]}
                    rules={[
                      { required: true },
                      {
                        validator(_, value) {
                          if (value === 0 || value >= 1000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Price must be 0 or at least 1000")
                          );
                        },
                      },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="Child Prices" min={0} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleFilled
                      style={{
                        color: "red",
                        fontSize: "2.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              ))}
              <PrimaryButton
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
                text="Add Price"
              />
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default CreateTourPrice;
