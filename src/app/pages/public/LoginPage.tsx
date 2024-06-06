import { Image, Space, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";

import logoAuth from "../../../assets/logoAuth.png";
import { Form } from "../../components/form";
import { LoginParams, useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/inputs";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";

export default function LoginPage() {
  const navigate = useNavigate();
  const { state, handleLogin } = useAuth();

  const initialValues: LoginParams = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginParams) => {
    handleLogin(values, navigate);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Space className="w-1/3" direction="vertical" size="large">
        <div className="flex justify-center">
          <Image src={logoAuth} preview={false} />
        </div>
        <div>
          <Form
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
          <PrimaryButton.BoldText text="Log In" />
        </div>
        <div>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </Space>
      {state.error && (
        <article className="text-red-500">
          Login Failed, Please try later
        </article>
      )}
    </div>
  );
}
