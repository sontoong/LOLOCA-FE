import { Col, Row, Typography } from "antd";
import { Form } from "../../components/form";
import { Input, InputDate, InputSelect } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";
import { ProfileUpload } from "../../components/image-upload";
import { useState } from "react";
import { Image } from "../../components/image-upload/profile-upload";



const CustomerProfile = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [images, setImages] = useState<Image[]>([]);

  const initialValues = {
    addressCustomer: "",
    firstName: "",
    lastName: "",
    gender: 0,
    dateOfBirth: "",
    phoneNumber: "",
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  const genderSelectOptions = genderOptions.map(option =>
    option.value === 0 ? { ...option, label: "None" } : option
  );

  return (
    <div className="mx-auto my-[5rem] w-[60%]">
      <Title style={{ color: "#004AAD", fontWeight: "bolder" }}>
        Profile
      </Title>
        <ProfileUpload setImages={setImages} value={images}/>
      <Form
        form={form}
        initialValues={initialValues}
        name="CustomerProfileForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="addressCustomer"
          label="Address"
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Type your email here" />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
        >
          <InputDate placeholder="Enter your date of birth" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
            { pattern: /^\d+$/, message: "Phone number must be numeric" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <InputSelect
            placeholder="Select your gender"
            options={genderSelectOptions}
          />
        </Form.Item>
        <div className="flex justify-end">
          <PrimaryButton text="Submit" onClick={() => form.submit()} />
        </div>
      </Form>
    </div>
  );
};

export default CustomerProfile;
