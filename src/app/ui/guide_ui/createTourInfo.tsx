import { Col, Row } from "antd";
import { Form } from "../../components/form";
import { Input, InputNumber, InputSelect } from "../../components/inputs";

const CreateTourInfo = ({ form }: { form: any }) => {
  const initialValues = {
    name: "",
    category: null,
    duration: null,
    tourTypeDTOs: [],
    activity: null,
  };

  const onFinish = (values: any) => {
    const submitValues = {
      ...values,
      tourTypeDTOs: values.tourTypeDTOs.map((typeDetail: string) => ({
        typeDetail,
      })),
    };
    console.log("Form Values: ", submitValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const tourActivityLevel = [
    {value: "1", label: "Low"},
    {value: "2", label: "Medium"},
    {value: "3", label: "High"},
  ]

  const tourCategories = [
    { value: "funny", label: "Funny" },
    { value: "adventure", label: "Adventure" },
    { value: "luxury", label: "Luxury" },
    { value: "family", label: "Family" },
    { value: "wildlife", label: "Wildlife" },
    { value: "real_life", label: "Real Life" },
    { value: "cultural", label: "Cultural" },
    { value: "budget", label: "Budget" },
    { value: "romantic", label: "Romantic" },
    { value: "beach", label: "Beach" },
    { value: "survival", label: "Survival" },
    { value: "gourmet", label: "Gourmet" },
    { value: "eco_friendly", label: "Eco-Friendly" },
    { value: "historical", label: "Historical" },
    { value: "mountain", label: "Mountain" },
    { value: "urban_exploration", label: "Urban Exploration" },
    { value: "rural_retreat", label: "Rural Retreat" },
    { value: "spiritual", label: "Spiritual" },
    { value: "festival", label: "Festival" },
    { value: "wellness", label: "Wellness" },
  ];

  const tourTypes = [
    { value: "Funny", label: "Funny" },
    { value: "Adventure", label: "Adventure" },
    { value: "Luxury", label: "Luxury" },
    { value: "Family", label: "Family" },
    { value: "Wildlife", label: "Wildlife" },
    { value: "Real Life", label: "Real Life" },
    { value: "Cultural", label: "Cultural" },
    { value: "Budget", label: "Budget" },
    { value: "Romantic", label: "Romantic" },
    { value: "Beach", label: "Beach" },
    { value: "Survival", label: "Survival" },
    { value: "Gourmet", label: "Gourmet" },
    { value: "Eco-Friendly", label: "Eco-Friendly" },
    { value: "Historical", label: "Historical" },
    { value: "Mountain", label: "Mountain" },
    { value: "Urban Exploration", label: "Urban Exploration" },
    { value: "Rural Retreat", label: "Rural Retreat" },
    { value: "Spiritual", label: "Spiritual" },
    { value: "Festival", label: "Festival" },
    { value: "Wellness", label: "Wellness" },
  ];

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="CreateTourInfoForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        label="Tour Request"
        rules={[
          {
            type: "string",
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Enter tour name here" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
            message: "Please select a category",
          },
        ]}
      >
        <InputSelect
          placeholder="Choose category of holiday"
          options={tourCategories}
        />
      </Form.Item>
      <Form.Item
        name="tourTypeDTOs"
        label="Tour Type"
        rules={[
          {
            required: true,
            message: "Please select a type",
          },
        ]}
      >
        <InputSelect.Tag
          placeholder="Choose types of holiday"
          options={tourTypes}
        />
      </Form.Item>
      <Row>
        <Col span={10}>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[
              { required: true, message: "Please enter duration of tour" },
            ]}
          >
            <InputNumber placeholder="Enter a duration" unit="day" pluralUnit="days"/>
          </Form.Item>
        </Col>
        <Col offset={4} span={10}>
          <Form.Item
            name="activity"
            label="Acttvity Level"
            rules={[
              { required: true, message: "Please choose a activity level" },
            ]}
          >
            <InputSelect
              placeholder="Choose activity level"
              options={tourActivityLevel}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateTourInfo;
