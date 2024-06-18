import { Typography } from "antd";
import { defaultImage } from "../../../constants/images";

const BannerContainer = ({
  image,
  title,
  description,
}: BannerContainerProps) => {
  const { Title, Text } = Typography;

  // const onTabPaneChange = (key: string) => {
  //   console.log(key);
  // };

  return (
    <div
      style={{
        backgroundImage: `url(${image ?? defaultImage})`,
        boxShadow: "600px -6px 22px -4px rgba(0,0,0,0.49) inset",
        WebkitBoxShadow: "60px -6px 22px -4px rgba(0,0,0,0.49) inset",
        MozBoxShadow: "60px -6px 22px -4px rgba(0,0,0,0.49) inset",
        backgroundAttachment: "fixed",
      }}
      className="bg-cover bg-center h-[400px] p-[5%] pt-[3%]"
    >
      <Title
        style={{
          color: "white",
          fontSize: "500%",
          fontWeight: "bold",
        }}
      >
        {title}
      </Title>
      <Text
        style={{
          color: "white",
          fontSize: "120%",
          display: "block",
          width: "40%",
        }}
      >
        {description}
      </Text>
      {/* <div style={{ marginTop: "auto" }}>
        <Tabs onChange={onTabPaneChange} type="card" items={tabPaneItems} />
      </div> */}
    </div>
  );
};

export default BannerContainer;

type BannerContainerProps = {
  image?: string;
  title?: string;
  description?: string;
};

// const tabPaneItems: TabsProps["items"] = [
//   {
//     key: "tours",
//     label: "Tours",
//   },
//   {
//     key: "tourguide",
//     label: "Tour guides",
//   },
// ];
