import { Space, Tooltip, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import logoAuth from "../../../assets/logoAuth.png";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Image } from "../../components/image";
import { Input } from "../../components/inputs";
import { useAuth } from "../../hooks/useAuth";
import { LoginParams, VerifyParams } from "../../redux/slice/authSlice";
import { Modal } from "../../components/modals";
import { useUI } from "../../hooks/useUI";

const { Text, Paragraph } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const { state: stateAuth, handleLogin, handleRegisterVerify } = useAuth();
  const { state: stateUI } = useUI();

  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);

  const initialValues: LoginParams = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginParams) => {
    handleLogin(values, navigate);
  };

  const handleOk = (values: VerifyParams) => {
    handleRegisterVerify(values, navigate);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Space className="w-1/3" direction="vertical" size="large">
        <div className="flex justify-center">
          <Image
            src={logoAuth}
            preview={false}
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
        </div>
        <div>
          <Form
            form={form}
            initialValues={initialValues}
            name="LoginPage"
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
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
          </Form>
          <Link to="/">Forgot Password?</Link>
        </div>
        <div className="flex justify-end">
          <PrimaryButton.BoldText
            text="Log In"
            loading={stateAuth.isFetching}
            onClick={() => form.submit()}
          />
        </div>
        <div>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
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
