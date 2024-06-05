import { useNavigate } from "react-router-dom";
import { Form } from "../../components/form";
import { LoginParams, useAuth } from "../../hooks/useAuth";
import { Image } from "antd";
import logoAuth from "../../../assets/logoAuth.png";

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
    <div>
      <Image src={logoAuth} preview={false} />
      <Form
        initialValues={initialValues}
        name="LoginPage"
        onFinish={handleSubmit}
      >
        <Form.Item></Form.Item>
      </Form>
    </div>
  );
}
