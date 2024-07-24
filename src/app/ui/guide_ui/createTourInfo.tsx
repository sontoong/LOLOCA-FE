import { Col, FormInstance, InputNumber, Row } from "antd";
import { Form } from "../../components/form";
import { Input, InputSelect } from "../../components/inputs";
import { ImageUpload } from "../../components/image-upload";
import { UploadFile } from "antd/lib";
import { useEffect } from "react";

const CreateTourInfo = ({
  form,
  initialValues,
  setTourImages,
  tourImages,
}: {
  form: FormInstance;
  initialValues: any;
  setTourImages: any;
  tourImages: UploadFile[];
}) => {
  useEffect(() => {
    form.setFieldsValue({ ...initialValues });
  }, [form, initialValues, setTourImages]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="CreateTourInfoForm"
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
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
      <Form.Item
        name="images"
        label="Hình ảnh tour"
        rules={[
          {
            required: false,
          },
        ]}
        extra={
          <div className="mt-5">
            <div>*Định dạng tệp được chấp nhận: .jpg, .png</div>
            <div>*Kích thước tệp phải nhỏ hơn 2MB</div>
          </div>
        }
      >
        <ImageUpload
          setImages={setTourImages}
          images={tourImages}
          maxCount={10}
        />
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
        name={"tourTypeDTOs"}
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
              {
                type: "number",
                required: true,
                message: "Please enter duration of tour",
              },
              {
                type: "number",
                min: 1,
              },
            ]}
          >
            <InputNumber placeholder="Enter a duration" min={0} />
          </Form.Item>
        </Col>
        <Col offset={4} span={10}>
          <Form.Item
            name="activity"
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

const tourActivityLevel = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
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
