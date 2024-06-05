import { Link, useNavigate } from "react-router-dom";
import { SignupParams, useAuth } from "../../hooks/useAuth";
import { Form } from "../../components/form";
import { Typography } from "antd";
import { Input, InputPassword } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";

const { Title } = Typography;

export default function SignupPage() {
  const navigate = useNavigate();
  const { state, handleSignup } = useAuth();

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
    <div>
      <Form
        initialValues={initialValues}
        name="SignupPage"
        className="clear-both flex flex-col items-center justify-center space-y-5"
        onFinish={handleSubmit}
      >
        <section className="w-[70%] space-y-5 ">
          <div className="mb-12 ml-1 mt-[20%] ">
            <div className="mt-3 w-full">
              Đã có tài khoản? Đăng nhập tại{" "}
              <Link to={"/login"} className="text-blue-500">
                đây
              </Link>
            </div>
          </div>
          <div>
            <Title level={5}>Bạn muốn tạo tài khoản cho</Title>
            <Form.Item name="role">
              {/* <FormRadioButtonGroup options={userRole} /> */}
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            label="Địa chỉ Email"
            rules={[
              {
                type: "email",
                min: 1000,
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[
              {
                type: "string",
                max: 20,
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
              {
                min: 8,
                message: "Mật khẩu phải có ít nhất 8 kí tự",
              },
            ]}
          >
            <InputPassword />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            label="Nhập lại mật khẩu"
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <InputPassword />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
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
            <Input />
          </Form.Item>
        </section>

        <PrimaryButton
          htmlType="submit"
          className="text-md h-11 w-[70%] font-bold"
          loading={state.isFetching}
        >
          {/* {languageText.signupButton} */}
        </PrimaryButton>
        {/* {state.error && selectedLanguage === LANGUAGES.VIETNAMESE && (
          <article className="text-red-500">{state.displayError}</article>
        )} */}

        {/* {state.error && selectedLanguage !== LANGUAGES.VIETNAMESE && (
          <article className="text-red-500">
            Login Failed, Please try later!
          </article>
        )} */}
      </Form>
    </div>
  );
}
