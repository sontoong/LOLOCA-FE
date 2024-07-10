import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Space, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import logoAuth from "../../../assets/logoAuth.png";
import bannerRegister from "../../../assets/registerBanner.png";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Image } from "../../components/image";
import { Input } from "../../components/inputs";
import { Modal } from "../../components/modals";
import { useAuth } from "../../hooks/useAuth";
import {
  ForgetPasswordNewPasswordParams,
  ForgetPasswordParams,
  ForgetPasswordVerifyParams,
} from "../../redux/slice/authSlice";
import { useUI } from "../../hooks/useUI";
import { FormInstance } from "antd/lib";

const { Title, Text, Paragraph } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    handleForgetPassword,
    handleForgetPasswordVerify,
    handleForgetPasswordNewPassword,
  } = useAuth();
  const { state: stateUI } = useUI();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const emailValue = Form.useWatch("email", form1);

  const initialValuesForm1 = {
    email: "",
  };
  const initialValuesForm2 = {
    password: "",
  };

  const handleSubmitForm1 = (values: ForgetPasswordParams) => {
    handleForgetPassword(values);
  };
  const handleSubmitForm2 = (values: ForgetPasswordNewPasswordParams) => {
    const data = {
      ...values,
      ...stateUI.forgotPasswordForm.extraValues,
    };
    handleForgetPasswordNewPassword(data, navigate);
  };

  const handleOk = (values: ForgetPasswordVerifyParams) => {
    handleForgetPasswordVerify(values);
  };

  const formSwitch = () => {
    switch (stateUI.forgotPasswordForm.step) {
      case 1:
        return (
          <ForgotPasswordForm1
            form={form1}
            handleSubmit={handleSubmitForm1}
            initialValues={initialValuesForm1}
          />
        );
      case 2:
        return (
          <ForgotPasswordForm2
            form={form2}
            handleSubmit={handleSubmitForm2}
            initialValues={initialValuesForm2}
          />
        );

      default:
        break;
    }
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
          {formSwitch()}
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

function ForgotPasswordForm1({
  form,
  initialValues,
  handleSubmit,
}: {
  form: FormInstance;
  initialValues: any;
  handleSubmit: (values: ForgetPasswordParams) => void;
}) {
  const { state: stateAuth } = useAuth();

  return (
    <>
      <Title level={3}>Enter Your Account Email</Title>
      <Form
        form={form}
        initialValues={initialValues}
        name="RegisterPageForm1"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
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
      </Form>
      <div className="flex justify-end">
        <PrimaryButton.BoldText
          text="Submit"
          onClick={() => form.submit()}
          loading={stateAuth.isSending}
        />
      </div>
    </>
  );
}

function ForgotPasswordForm2({
  form,
  initialValues,
  handleSubmit,
}: {
  form: FormInstance;
  initialValues: any;
  handleSubmit: (values: ForgetPasswordNewPasswordParams) => void;
}) {
  const { state: stateAuth } = useAuth();

  return (
    <>
      <Title level={3}>Set New Password</Title>
      <Form
        form={form}
        initialValues={initialValues}
        name="RegisterPageForm2"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="password"
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
      </Form>
      <div className="flex justify-end">
        <PrimaryButton.BoldText
          text="Submit"
          onClick={() => form.submit()}
          loading={stateAuth.isSending}
        />
      </div>
    </>
  );
}
