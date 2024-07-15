import { Col, Row, Typography, UploadFile } from "antd";
import { Form } from "../../components/form";
import { Input, InputDate, InputSelect } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";
import { ImageUpload } from "../../components/image-upload";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Customer } from "../../models/customer";
import dayjs from "dayjs";
import { useCustomer } from "../../hooks/useCustomer";
import {
  base64ToBlob,
  dateToLocalISOString,
  ensureBase64Avatar,
} from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

const CustomerProfile = () => {
  const { handleUpdateCustomerInformation, handleUpdateCustomerAvatar } =
    useCustomer();
  const { state: stateAuth, handleGetUserInfo } = useAuth();
  const { state: stateCustomer } = useCustomer();
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [images, setImages] = useState<UploadFile[]>([]);

  const currentUser = stateAuth.currentUser as Customer;

  useEffect(() => {
    form.setFieldsValue({
      addressCustomer: currentUser.addressCustomer,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      gender: currentUser.gender,
      dateOfBirth: dayjs(currentUser.dateOfBirth),
      phoneNumber: currentUser.phoneNumber,
    });
    if (currentUser.avatar) {
      setImages([
        {
          name: "Avatar",
          uid: uuidv4(),
          url: ensureBase64Avatar(currentUser.avatar),
        },
      ]);
    }
  }, [currentUser, form]);

  const initialValues = {
    addressCustomer: "",
    firstName: "",
    lastName: "",
    gender: null as unknown as number,
    dateOfBirth: "",
    phoneNumber: "",
  };

  const onFinish = async (values: any) => {
    const dateOfBirthString = dateToLocalISOString(values.dateOfBirth);
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    await handleUpdateCustomerAvatar({
      CustomerId: parseInt(userId),
      files: images.flatMap((image) => {
        if (image.originFileObj) {
          return [image.originFileObj];
        } else if (image.url) {
          const blob = base64ToBlob(image.url, image.name);
          return blob ? [blob] : [];
        } else {
          return [];
        }
      }),
    });
    await handleUpdateCustomerInformation({
      ...values,
      customerId: userId,
      dateOfBirth: dateOfBirthString,
    });
    await handleGetUserInfo();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  return (
    <div className="mx-auto my-[5rem] w-[60%]">
      <Title style={{ color: "#004AAD", fontWeight: "bolder" }}>Profile</Title>
      <ImageUpload images={images} setImages={setImages} />
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
            options={genderOptions}
          />
        </Form.Item>
        <div className="flex justify-end">
          <PrimaryButton
            text="Submit"
            onClick={() => form.submit()}
            loading={stateCustomer.isSending}
          />
        </div>
      </Form>
    </div>
  );
};

export default CustomerProfile;
