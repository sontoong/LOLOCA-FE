import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Space, Tooltip, Typography } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAuth from "../../../assets/logoAuth.png";
import bannerRegister from "../../../assets/registerBanner.png";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Image } from "../../components/image";
import { Input, InputSelect } from "../../components/inputs";
import { Modal } from "../../components/modals";
import { useAuth } from "../../hooks/useAuth";
import {
  TourGuideRegisterParams,
  VerifyParams,
} from "../../redux/slice/authSlice";
import { useUI } from "../../hooks/useUI";
import { useCity } from "../../hooks/useCity";

const { Text, Paragraph } = Typography;

export default function TourGuideRegister() {
  const navigate = useNavigate();
  const {
    state: stateAuth,
    handleTourGuideRegister,
    handleRegisterVerify,
  } = useAuth();
  const { state: stateCity, handleGetCities } = useCity();
  const { state: stateUI } = useUI();
  const [policyAccept, setPolicyAccept] = useState(false);

  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);

  useEffect(() => {
    handleGetCities();
  }, [handleGetCities]);

  const initialValues: TourGuideRegisterParams = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    cityId: null,
    address: "",
    gender: null,
  };

  const handlePolicyAccept = () => {
    setPolicyAccept(!policyAccept);
  };

  const handleSubmit = (values: TourGuideRegisterParams) => {
    handleTourGuideRegister({
      ...values,
      gender: 0,
      dateOfBirth: new Date().toISOString(),
    });
  };

  const handleOk = (values: VerifyParams) => {
    handleRegisterVerify(values, navigate);
  };

  const filterOption = (input: string, option: any) =>
    option.children.toLowerCase().includes(input.toLowerCase());

  return (
    <div className="my-[2rem] flex items-center justify-center">
      <Space size={10}>
        <div className="m-[50px]">
          <Image width={600} src={bannerRegister} preview={false} />
        </div>
        <Space direction="vertical" size="large">
          <div className="flex justify-center">
            <Image
              width={300}
              src={logoAuth}
              preview={false}
              onClick={() => navigate("/")}
              className="cursor-pointer"
            />
          </div>
          <Form
            form={form}
            initialValues={initialValues}
            name="TourGuideRegister"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  type: "string",
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Space className="w-full justify-between">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    type: "string",
                    required: true,
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  {
                    type: "string",
                    required: true,
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Space>
            <Form.Item
              name="cityId"
              label="Choose your city"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputSelect
                showSearch
                placeholder="Choose your city"
                optionFilterProp="children"
                filterOption={filterOption}
              >
                {stateCity.cityList.map((city) => (
                  <InputSelect.Option key={city.cityId} value={city.cityId}>
                    {city.name}
                  </InputSelect.Option>
                ))}
              </InputSelect>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Choose gender"
              rules={[
                {
                  required: true,
                  message: "Please select your gender!",
                },
              ]}
            >
              <InputSelect>
                <InputSelect.Option value="1">Male</InputSelect.Option>
                <InputSelect.Option value="2">Female</InputSelect.Option>
              </InputSelect>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  type: "string",
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone"
              rules={[
                {
                  required: true,
                  type: "string",
                  pattern: /^[0-9]+$/,
                  len: 11,
                  message: "Số điện thoại không hợp lệ",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="0868 *** ****" />
            </Form.Item>
            <Checkbox checked={policyAccept} onChange={handlePolicyAccept}>
              I have read and accept the{" "}
              <Link to="/">Terms and Conditions</Link> &{" "}
              <Link to="/">Privacy Policy</Link>
            </Checkbox>
          </Form>
          {/* submit button */}
          <div className="flex justify-end">
            <PrimaryButton.BoldText
              text="Create"
              disabled={!policyAccept}
              onClick={() => form.submit()}
              loading={stateAuth.isSending}
            />
          </div>
          <div>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Space>
      </Space>
      <Modal.OTP
        extraValues={{ email: emailValue }}
        open={stateUI.OTPModal.open}
        handleOk={handleOk}
        confirmLoading={stateUI.isLoading}
      >
        <Paragraph>
          An OTP has been sent to your email{" "}
          <Text className="text-blue-500">{emailValue}</Text>. Please check your
          inbox (and spam folder if not found) for the OTP to proceed with the
          verification process.
        </Paragraph>
      </Modal.OTP>
    </div>
  );
}
