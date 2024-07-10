import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Space, Tooltip, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAuth from "../../../assets/logoAuth.png";
import bannerRegister from "../../../assets/registerBanner.png";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Image } from "../../components/image";
import { Input } from "../../components/inputs";
import { Modal } from "../../components/modals";
import { useAuth } from "../../hooks/useAuth";
import { RegisterParams, VerifyParams } from "../../redux/slice/authSlice";
import { useUI } from "../../hooks/useUI";

const { Text, Paragraph } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { state: stateAuth, handleRegister, handleRegisterVerify } = useAuth();
  const { state: stateUI } = useUI();
  const [policyAccept, setPolicyAccept] = useState(false);

  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);

  const initialValues: RegisterParams = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: 0,
  };

  const handlePolicyAccept = () => {
    setPolicyAccept(!policyAccept);
  };

  const handleSubmit = (values: RegisterParams) => {
    handleRegister({
      ...values,
      gender: 0,
      dateOfBirth: new Date().toISOString(),
    });
  };

  const handleOk = (values: VerifyParams) => {
    handleRegisterVerify(values, navigate);
  };

  return (
    <div className="flex h-screen items-center justify-center">
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
            name="RegisterPage"
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
