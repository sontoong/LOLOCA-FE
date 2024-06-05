import { Input, InputProps } from "antd";

function CustomInput(props: TCustomInput) {
  return <Input size="large" {...props} />;
}

export default CustomInput;

type TCustomInput = Omit<InputProps, "style">;
