import { useState } from "react";
import { Input, Typography, Form } from "antd";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";

const { Title } = Typography;

const CreateTourItinerary = ({ form }: { form: any }) => {
  const [itineraryItems, setItineraryItems] = useState([
    {
      name: "",
      description: "",
    },
  ]);

  const onFinish = (values: any) => {
    console.log("Form Values: ", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddItinerary = () => {
    setItineraryItems([...itineraryItems, { name: "", description: "" }]);
  };

  const handleDeleteItinerary = (index: number) => {
    const updatedItinerary = [...itineraryItems];
    updatedItinerary.splice(index, 1);
    setItineraryItems(updatedItinerary);
    form.setFieldsValue({
      tourItineraryDTOs: updatedItinerary,
    });
  };

  return (
    <Form
      form={form}
      initialValues={{ tourItineraryDTOs: itineraryItems }}
      name="CreateTourItineraryForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title style={{ color: "#004AAD" }}>Itinerary</Title>

      {itineraryItems.map((item, index) => (
        <div key={index}>
          {index > 0 && <Divider colorSplit="black" />}
          <div className="flex justify-end mb-[1rem]">
            {itineraryItems.length > 1 && (
              <PrimaryButton
                text="Delete Itinerary"
                onClick={() => handleDeleteItinerary(index)}
              />
            )}
          </div>
          <Form.Item
            name={["tourItineraryDTOs", index, "name"]}
            label="Itinerary"
            rules={[{ required: true, message: "Please enter itinerary name" }]}
          >
            <Input
              placeholder="Enter itinerary name"
              value={item.name}
              onChange={(e) => {
                const updatedItems = [...itineraryItems];
                updatedItems[index].name = e.target.value;
                setItineraryItems(updatedItems);
              }}
            />
          </Form.Item>
          <Form.Item
            name={["tourItineraryDTOs", index, "description"]}
            label="Description"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter itinerary description",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter itinerary description"
              value={item.description}
              onChange={(e) => {
                const updatedItems = [...itineraryItems];
                updatedItems[index].description = e.target.value;
                setItineraryItems(updatedItems);
              }}
            />
          </Form.Item>
        </div>
      ))}
      <PrimaryButton
        text="Add Itinerary"
        className="w-full"
        onClick={handleAddItinerary}
      />
    </Form>
  );
};

export default CreateTourItinerary;
