import { Input, InputProps } from "antd";

function CustomInputPassword(props: TCustomInput) {
  return <Input.Password size="large" {...props} />;
}

export default CustomInputPassword;

type TCustomInput = Omit<InputProps, "style">;
