import { ConfigProvider, Input, InputProps, theme } from "antd";

function CustomInput(props: TCustomInput) {
  const { token } = theme.useToken();

  return <ConfigProvider
  theme={{
    token: {
      colorBgContainer: props.colorBgContainer ?? token.colorBgContainer,
      colorTextPlaceholder: props.colorTextPlaceholder	?? token.colorTextPlaceholder,
    },
  }}
  >
    <Input size="large" {...props} />
  </ConfigProvider>;
}

function CustomInputPassword(props: TCustomInput) {
  return <Input.Password size="large" {...props} />;
}

CustomInput.Password = CustomInputPassword;
CustomInput.OTP = Input.OTP;

export default CustomInput;

type TCustomInput = Omit<InputProps, "style"> & {
  colorBgContainer?: string,
  colorTextPlaceholder?: string,
};
