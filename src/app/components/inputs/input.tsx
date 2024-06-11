import { ConfigProvider, Input, InputProps, theme } from "antd";

function CustomInput({
  colorBgContainer,
  colorTextPlaceholder,
  ...rest
}: CustomInput) {
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

function CustomInputPassword(props: CustomInput) {
  return <Input.Password size="large" {...props} />;
}

CustomInput.Password = CustomInputPassword;
CustomInput.OTP = Input.OTP;

export default CustomInput;

type CustomInput = Omit<InputProps, "style"> & {
  colorBgContainer?: string;
  colorTextPlaceholder?: string;
};
