import { Select, SelectProps } from "antd";

export function CustomSelectTag(props: CustomSelectProps) {
    return <Select style={{ height: "42px", minHeight: "42px" }} mode="multiple" allowClear {...props} />;
}

export function CustomSelect(props: CustomSelectProps) {
  return <Select style={{ height: "42px", minHeight: "42px" }} allowClear {...props} />;
}

CustomSelect.Tag = CustomSelectTag
export default CustomSelect;

type CustomSelectProps = Omit<SelectProps, "style">