import { Col, Row, Typography } from "antd";
import { Form } from "../../components/form";
import { Input, InputNumber, InputSelect } from "../../components/inputs";
import { ImageUpload } from "../../components/image-upload";
import { UploadFile } from "antd/lib";
import { base64ToBlob } from "../../utils/utils";
import { CreateTourParams } from "../../redux/slice/tourSlice";

const CreateTourInfo = ({ form, initialValues, setTourImages, tourImages, setDuration, duration }: { form: any, initialValues: CreateTourParams, setTourImages: any, tourImages: UploadFile[], setDuration: (value: number | undefined) => void, duration: number | undefined }) => {
  const { Paragraph } = Typography;

  const onFinish = (values: CreateTourParams) => {
    console.log("Tour Images:", tourImages);

    const submitValues = {
      ...values,
      images: tourImages.flatMap((image) => {
        if (image.originFileObj) {
          return [image.originFileObj];
        } else if (image.url) {
          const blob = base64ToBlob(image.url, image.name);
          return blob ? [blob] : [];
        } else {
          return [];
        }
      }),
    };
    console.log("Form Values: ", submitValues);

    // Set the duration value
    setDuration(values.Duration);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const tourActivityLevel = [
    {value: "Low", label: "Low"},
    {value: "Medium", label: "Medium"},
    {value: "High", label: "High"},
  ];

  const tourCategories = [
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
    { value: "Eco Friendly", label: "Eco-Friendly" },
    { value: "Historical", label: "Historical" },
    { value: "Mountain", label: "Mountain" },
    { value: "Urban Exploration", label: "Urban Exploration" },
    { value: "Rural Retreat", label: "Rural Retreat" },
    { value: "Spiritual", label: "Spiritual" },
    { value: "Festival", label: "Festival" },
    { value: "Wellness", label: "Wellness" },
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
        name="Name"
        label="Tour Name"
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
      <Paragraph><span className="text-red-500 text-[1.2rem]">* </span>Images</Paragraph>
      <ImageUpload setImages={setTourImages} images={tourImages} maxCount={10} />
      <Form.Item
        name="Category"
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
        name="TypeDetails"
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
            name="Duration"
            label="Duration"
            rules={[
              { required: true, message: "Please enter duration of tour" },
            ]}
          >
            <InputNumber placeholder="Enter a duration" defaultValue={duration || 0} unit="day" pluralUnit="days" />
          </Form.Item>
        </Col>
        <Col offset={4} span={10}>
          <Form.Item
            name="Activity"
            label="Activity Level"
            rules={[
              { required: true, message: "Please choose an activity level" },
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
