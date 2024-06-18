import { ConfigProvider, Input, InputProps, theme } from "antd";
import { TextAreaProps } from "antd/es/input";

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

function CustomInputTextArea(props: CustomTextArea) {
  return <Input.TextArea {...props} />;
}

CustomInput.Password = CustomInputPassword;
CustomInput.OTP = Input.OTP;
CustomInput.TextArea = CustomInputTextArea;

export default CustomInput;

type CustomInput = Omit<InputProps, "style"> & {
  colorBgContainer?: string;
  colorTextPlaceholder?: string;
};

type CustomTextArea = Omit<TextAreaProps, "style">


