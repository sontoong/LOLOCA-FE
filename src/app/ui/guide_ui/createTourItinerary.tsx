import { Input, Typography, Form } from "antd";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";

const { Title } = Typography;

const CreateTourItinerary = ({ form }: { form: any }) => {
  const onFinish = (values: any) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form form={form} name="CreateTourItineraryForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Title style={{ color: "#004AAD" }}>Itinerary</Title>

      <Form.List name="itineraries">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key}>
                {index > 0 && <Divider colorSplit="black" />}
                <div className="flex justify-end mb-[1rem]">
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
                  name={[name, 'name']}
                  label="Itinerary"
                  rules={[{ required: true, message: 'Please enter itinerary name' }]}
                >
                  <Input placeholder="Enter itinerary name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please enter itinerary description',
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
                add({ name: "", description: "" });
              }}
            />
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default CreateTourItinerary;
