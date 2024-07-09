import { useState, useMemo, useEffect } from "react";
import { Input, Typography, Form } from "antd";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";

const { Title } = Typography;

interface ItineraryItem {
  name: string;
  description: string;
}

const CreateTourItinerary = ({ form, initialValues, setItineraryCount }: { form: any, initialValues: any, setItineraryCount: (count: number) => void }) => {
  const itineraryNames = useMemo(() => initialValues.ItineraryNames || [], [initialValues.ItineraryNames]);
  const itineraryDescriptions = useMemo(() => initialValues.ItineraryDescriptions || [], [initialValues.ItineraryDescriptions]);

  const initialItinerary: ItineraryItem[] = useMemo(() => (
    itineraryNames.map((name: string, index: number) => ({
      name,
      description: itineraryDescriptions[index] || "",
    }))
  ), [itineraryNames, itineraryDescriptions]);

  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(initialItinerary);

  useEffect(() => {
    // Update the itinerary count when items change
    setItineraryCount(itineraryItems.length);
  }, [itineraryItems, setItineraryCount]);

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
      ItineraryNames: updatedItinerary.map(item => item.name),
      ItineraryDescriptions: updatedItinerary.map(item => item.description),
    });
  };

  return (
    <Form
      form={form}
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
            name={['ItineraryNames', index]}
            label="Itinerary"
            rules={[{ required: true, message: 'Please enter itinerary name' }]}
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
            name={['ItineraryDescriptions', index]}
            label="Description"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please enter itinerary description',
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
