import { ConfigProvider, Input, InputProps, theme } from "antd";

function CustomInput({
  colorBgContainer,
  colorTextPlaceholder,
  ...rest
}: TCustomInput) {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: colorBgContainer ?? token.colorBgContainer,
          colorTextPlaceholder:
            colorTextPlaceholder ?? token.colorTextPlaceholder,
        },
      }}
    >
      <Input size="large" {...rest} />
    </ConfigProvider>
  );
}

function CustomInputPassword(props: TCustomInput) {
  return <Input.Password size="large" {...props} />;
}

CustomInput.Password = CustomInputPassword;
CustomInput.OTP = Input.OTP;

export default CustomInput;

type TCustomInput = Omit<InputProps, "style"> & {
  colorBgContainer?: string;
  colorTextPlaceholder?: string;
};
