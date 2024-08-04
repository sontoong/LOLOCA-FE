import { MinusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useEffect } from "react";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { InputNumber } from "../../components/inputs";

const { Title } = Typography;

const CreateTourPrice = ({
  form,
  initialValues,
}: {
  form: any;
  initialValues: any;
}) => {
  useEffect(() => {
    form.setFieldsValue({ ...initialValues });
  }, [form, initialValues]);

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
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <Form.List name="tourPriceDTOs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name, key }, index) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Form.Item
                    name={[name, "totalTouristFrom"]}
                    rules={[
                      { type: "number", required: true },
                      { type: "number", min: 1, message: "Phải ít nhất 1" },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <InputNumber placeholder="From" min={0} />
                  </Form.Item>
                  <Form.Item
                    name={[name, "totalTouristTo"]}
                    rules={[
                      { type: "number", required: true },
                      { type: "number", min: 1, message: "Phải ít nhất 1" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const fromValue = getFieldValue([
                            "tourPriceDTOs",
                            index,
                            "totalTouristFrom",
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
                    name={[name, "adultPrice"]}
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
                    <InputNumber.Currency min={0} max={1000000} step={1000} />
                  </Form.Item>
                  <Form.Item
                    name={[name, "childPrice"]}
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
                    <InputNumber.Currency min={0} max={1000000} step={1000} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleFilled
                      style={{
                        color: "red",
                        fontSize: "2.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => remove(name)}
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
