import { Avatar, Card, Popover, Space, Tag, Typography } from "antd";
import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";

const RequestCard = ({ request, activeButton }: { request: any; activeButton: string }) => {
  const { Title, Paragraph } = Typography;
  const popoverContent = (
    <div>
      <p>Name: {request.name}</p>
      <p>Email: {request.email}</p>
    </div>
  );

  const renderButtons = () => {
    if (activeButton === "RequestForMe" || activeButton === "RequestForTour") {
      return (
        <>
          <PrimaryButton text="Accept" />
          <OutlineButton text="Reject" />
        </>
      );
    }
    if (activeButton === "RequestAccepted" || activeButton === "TourAccepted") {
      return (
        <>
          <PrimaryButton text="Finish" />
          <OutlineButton text="Cancel" />
        </>
      );
    }
  };

  return (
    <div>
      <Card className="w-[100%]">
        <Space align="start" style={{ display: "flex", justifyContent: "space-between" }}>
          <Space align="start" size={"large"}>
            <Space className="mt-[1rem]">
              <Popover content={popoverContent} title="Contact Information" placement="bottom">
                <Avatar src={VietNamBanner} size={70} />
              </Popover>
            </Space>
            <Space direction="vertical" className="mt-[2rem]">
              <Space align="center">
                <Title level={2} style={{ fontWeight: "bolder", color: "#004AAD", margin: 0 }}>
                  {request.tripName}
                </Title>
                <Tag style={{ height: "1.5rem" }} color="processing">
                  {request.tag}
                </Tag>
              </Space>
              <Space>
                {request.tags.map((tag: any, index: any) => (
                  <Tag key={index} style={{ height: "1.5rem" }} color="processing">
                    {tag}
                  </Tag>
                ))}
              </Space>
              <Paragraph>{request.description}</Paragraph>
              <Space align="center">
                <Title level={3} style={{ fontWeight: "bolder", color: "#004AAD", margin: 0 }}>
                  Amount:
                </Title>
                <Tag color="processing">{request.amount}</Tag>
              </Space>
            </Space>
          </Space>
          <Space direction="vertical">
            {renderButtons()}
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default RequestCard;
