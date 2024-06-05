import { InputNumber, InputNumberProps } from "antd";

function CustomInputNumber(props: TCustomInputNumber) {
  return <InputNumber size="large" min={0} changeOnWheel {...props} />;
}

export default CustomInputNumber;

type TCustomInputNumber = Omit<InputNumberProps, "style">;
