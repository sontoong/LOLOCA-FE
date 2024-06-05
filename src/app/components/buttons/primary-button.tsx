import { Button, ButtonProps, ConfigProvider, theme } from "antd";

function PrimaryButton({ children, bgColor, ...rest }: CustomButtonProps) {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: bgColor ?? token.colorPrimary,
            algorithm: true,
          },
        },
      }}
    >
      <Button type="primary" {...rest}>
        {children}
      </Button>
    </ConfigProvider>
  );
}

export default PrimaryButton;

type CustomButtonProps = ButtonProps & {
  bgColor?: string;
};
