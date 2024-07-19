import { Form, InputNumber, Typography } from "antd";
import { MinusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";

const { Title } = Typography;

const CreateTourPrice = ({ form }: { form: any }) => {
  const onFinish = (values: any) => {
    const formattedValues = {
      AdultPrices: values.price.map((item: any) => item.AdultPrices / 1000),
      ChildPrices: values.price.map((item: any) => item.ChildPrices / 1000),
      TotalTouristFrom: values.price.map((item: any) => item.TotalTouristFrom),
      TotalTouristTo: values.price.map((item: any) => item.TotalTouristTo),
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
        <Form.List name="price">
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
                    rules={[
                      { type: "number", required: true },
                      { type: "number", min: 1, message: "Phải ít nhất 1" },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="From" min={0} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "TotalTouristTo"]}
                    rules={[
                      { type: "number", required: true },
                      { type: "number", min: 1, message: "Phải ít nhất 1" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const fromValue = getFieldValue([
                            "price",
                            index,
                            "TotalTouristFrom",
                          ]);
                          if (
                            !value ||
                            fromValue === undefined ||
                            value > fromValue
                          ) {
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
                          if (value >= 1000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Price must be at least 1000"),
                          );
                        },
                      },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber
                      placeholder="Adult Prices"
                      min={0}
                      step={1000}
                      suffix="VND"
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "ChildPrices"]}
                    rules={[
                      { required: true },
                      {
                        validator(_, value) {
                          if (value >= 1000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Price must be at least 1000"),
                          );
                        },
                      },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber
                      placeholder="Child Prices"
                      min={0}
                      step={1000}
                      suffix="VND"
                    />
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
                style={{ width: "100%", display: "none" }}
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
