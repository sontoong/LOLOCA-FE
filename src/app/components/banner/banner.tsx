import { TabsProps, Typography } from "antd";
import { defaultImage } from "../../../constants/images";
import { BannerTabs } from "../tabs";

const { Title, Paragraph } = Typography;

const BannerContainer = ({
  image,
  title,
  description,
  tabPane,
}: BannerContainerProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image ?? defaultImage})`,
        boxShadow: "600px -6px 22px -4px rgba(0,0,0,0.49) inset",
        WebkitBoxShadow: "60px -6px 22px -4px rgba(0,0,0,0.49) inset",
        MozBoxShadow: "60px -6px 22px -4px rgba(0,0,0,0.49) inset",
        backgroundAttachment: "fixed",
      }}
      className="bg-cover bg-center px-[5%]"
    >
      <div className="py-5">
        <Title
          style={{
            color: "white",
            fontSize: "500%",
            fontWeight: "bold",
          }}
        >
          {title}
        </Title>
        <Paragraph
          style={{
            color: "white",
            fontSize: "120%",
            display: "block",
            width: "40%",
          }}
          ellipsis={{ rows: 6, expandable: true }}
        >
          {description}
        </Paragraph>
      </div>
      {tabPane ? (
        <BannerTabs
          onChange={tabPane.onTabPaneChange}
          type="card"
          items={tabPane.tabPaneItems}
          activeKey={tabPane.activeKey}
          size="large"
          tabBarGutter={10}
          tabPosition="top"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BannerContainer;

type BannerContainerProps = {
  image?: string;
  title?: string;
  description?: string;
  tabPane?: {
    tabPaneItems: TabsProps["items"];
    onTabPaneChange: TabsProps["onChange"];
    activeKey: TabsProps["activeKey"];
  };
};
