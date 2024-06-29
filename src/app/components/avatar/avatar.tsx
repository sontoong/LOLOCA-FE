import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider } from "antd";

function CustomAvatar(props: CustomAvatarProps) {
  const { src, size } = props;
  return (
    <ConfigProvider theme={{ token: { colorTextPlaceholder: "#bfbfbf" } }}>
      <Avatar size={size} src={src} icon={<UserOutlined />} />
    </ConfigProvider>
  );
}

export default CustomAvatar;

type CustomAvatarProps = {
  src?: string;
  size: number;
};
