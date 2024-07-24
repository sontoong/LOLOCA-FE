import { Input, Typography } from "antd";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import { Form } from "../../components/form";
import { useEffect } from "react";

const { Title } = Typography;

const CreateTourItinerary = ({
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
    <Form
      form={form}
      name="CreateTourItineraryForm"
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <Title style={{ color: "#004AAD" }}>Itinerary</Title>

      <Form.List name="tourItineraryDTOs">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key}>
                {index > 0 && <Divider colorSplit="black" />}
                <div className="mb-[1rem] flex justify-end">
                  {fields.length > 1 && (
                    <PrimaryButton
                      text="Delete Itinerary"
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  )}
                </div>
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  label="Itinerary"
                  rules={[
                    { required: true, message: "Please enter itinerary name" },
                  ]}
                >
                  <Input placeholder="Enter itinerary name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please enter itinerary description",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter itinerary description" />
                </Form.Item>
              </div>
            ))}
            <PrimaryButton
              text="Add Itinerary"
              className="w-full"
              onClick={() => {
                add();
              }}
            />
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default CreateTourItinerary;
