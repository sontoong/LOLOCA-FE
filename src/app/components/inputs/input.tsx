import { Input, InputProps } from "antd";

function CustomInput(props: TCustomInput) {
  return <Input size="large" {...props} />;
}

function CustomInputPassword(props: TCustomInput) {
  return <Input.Password size="large" {...props} />;
}

CustomInput.Password = CustomInputPassword;
CustomInput.OTP = Input.OTP;

export default CustomInput;

type TCustomInput = Omit<InputProps, "style">;
