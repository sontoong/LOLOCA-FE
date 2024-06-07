import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Image, Space, Tooltip, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logoAuth from "../../../assets/logoAuth.png";
import bannerRegister from "../../../assets/registerBanner.png";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { RegisterParams, useAuth, VerifyParams } from "../../hooks/useAuth";
import { useState } from "react";
import { PrimaryButton } from "../../components/buttons";
import { Modal } from "../../components/modals";

const { Text, Paragraph } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { state, handleRegister, handleRegisterVerify } = useAuth();
  const [policyAccept, setPolicyAccept] = useState(false);
  const [form] = Form.useForm();

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
    <div className="h-screen flex justify-center items-center">
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
              loading={state.isFetching}
            />
          </div>
          <div>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Space>
      </Space>
      <Modal.OTP
        email={state.showOTPModal.email}
        open={state.showOTPModal.open}
        handleOk={handleOk}
        confirmLoading={state.isFetching}
      >
        <Paragraph>
          An OTP has been sent to your email{" "}
          <Text className="text-blue-500">{state.showOTPModal.email}</Text>.
          Please check your inbox (and spam folder if not found) for the OTP to
          proceed with the verification process.
        </Paragraph>
      </Modal.OTP>
    </div>
  );
}
