import { Select, SelectProps } from "antd";

export function CustomSelectTag(props: CustomSelectProps) {
    return <Select style={{ height: "42px", minHeight: "42px" }} mode="multiple" allowClear {...props} />;
}

  export default CustomSelectTag;

type CustomSelectProps = Omit<SelectProps, "style">