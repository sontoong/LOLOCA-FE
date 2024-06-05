import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Image, Space, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logoAuth from "../../../assets/logoAuth.png";
import bannerSignup from "../../../assets/signup.png";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { SignupParams, useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { PrimaryButton } from "../../components/buttons";

export default function SignupPage() {
  const navigate = useNavigate();
  const { state, handleSignup } = useAuth();
  const [policyAccept, setPolicyAccept] = useState(false);

  const initialValues: SignupParams = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
  };

  const handleSubmit = async (values: SignupParams) => {
    handleSignup(values, navigate);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Space size={10}>
        <div className="m-[50px]">
          <Image width={600} src={bannerSignup} preview={false} />
        </div>
        <Space direction="vertical" size="large">
          <div className="flex justify-center">
            <Image width={300} src={logoAuth} preview={false} sizes="" />
          </div>
          <Form
            initialValues={initialValues}
            name="SignupPage"
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
            <Space>
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
                <Input.Password placeholder="Enter new password" />
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
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </Space>
            <Form.Item
              name="phone"
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
            <Checkbox
              checked={policyAccept}
              onChange={() => setPolicyAccept((prev) => !prev)}
            >
              I have read and accept the{" "}
              <Link to="/">Terms and Conditions</Link> &{" "}
              <Link to="/">Privacy Policy</Link>
            </Checkbox>
          </Form>
          <div className="flex justify-end">
            <PrimaryButton.BoldText text="Create" disabled={!policyAccept} />
          </div>
        </Space>
      </Space>
      {state.error && (
        <article className="text-red-500">
          Login Failed, Please try later
        </article>
      )}
    </div>
  );
}
