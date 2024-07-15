import { Avatar, Card, Popover, Space, Tag, Typography, Modal } from "antd";
import VietNamBanner from "../../../assets/banner.png";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import { BookingTourGuideRequest } from "../../models/bookingTourGuide";
import { useTourGuide } from "../../hooks/useTourGuide";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";

const { Title, Paragraph } = Typography;

const RequestCardTourGuide = ({
  request,
  customerId,
}: {
  request: BookingTourGuideRequest;
  customerId: string;
}) => {
  const [modal, contextHolder] = Modal.useModal();
  const { handleGetBookingTourGuideByTourGuideId } = useBookingTourGuide();
  const {
    handleAcceptBookingTourGuideRequest,
    handleRejectBookingTourGuideRequest,
  } = useTourGuide();

  const showConfirm = (action: Action) => {
    modal.confirm({
      title: `Are you sure you want to ${action.name}?`,
      onOk: action.action,
      onCancel() {
        console.log(`${action.name} canceled`);
      },
    });
  };

  const renderButtons = () => {
    if (request.status === 0) {
      return (
        <>
          <PrimaryButton
            text="Accept"
            onClick={() =>
              showConfirm({
                name: "accept",
                action: async () => {
                  await handleAcceptBookingTourGuideRequest({
                    bookingRequestId: request.bookingTourGuideRequestId,
                  });
                  await handleGetBookingTourGuideByTourGuideId({
                    tourGuideId: request.tourGuideId,
                  });
                },
              })
            }
          />
          <OutlineButton
            text="Reject"
            onClick={() =>
              showConfirm({
                name: "reject",
                action: async () => {
                  await handleRejectBookingTourGuideRequest({
                    bookingRequestId: request.bookingTourGuideRequestId,
                  });
                  await handleGetBookingTourGuideByTourGuideId({
                    tourGuideId: request.tourGuideId,
                  });
                },
              })
            }
          />
        </>
      );
    }
    if (request.status === 1) {
      return (
        <>
          <PrimaryButton
            text="Finish"
            onClick={() => showConfirm({ name: "finish", action: () => {} })}
          />
          <OutlineButton
            text="Cancel"
            onClick={() => showConfirm({ name: "cancel", action: () => {} })}
          />
        </>
      );
    }
  };

  const popoverContent = (
    <div>
      <p>CustomerId: {customerId}</p>
      {/* <p>Email: {customer.email}</p> */}
    </div>
  );

  return (
    <>
      <Card className="w-[100%]" hoverable>
        <Space
          align="start"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Space align="start" size={"large"}>
            <Space className="mt-[1rem]">
              <Popover
                content={popoverContent}
                title="Contact Information"
                placement="bottom"
              >
                <Avatar src={VietNamBanner} size={70} />
              </Popover>
            </Space>
            <Space direction="vertical" className="mt-[2rem]">
              <Space align="center">
                <Title
                  level={2}
                  style={{ fontWeight: "bolder", color: "#004AAD", margin: 0 }}
                >
                  {request.tourGuideName}
                </Title>
                {/* <Tag style={{ height: "1.5rem" }} color="processing">
                  {request.tag}
                </Tag> */}
              </Space>
              {/* <Space>
                {request.tags.map((tag: any, index: any) => (
                  <Tag
                    key={index}
                    style={{ height: "1.5rem" }}
                    color="processing"
                  >
                    {tag}
                  </Tag>
                ))}
              </Space> */}
              <Paragraph>{request.note}</Paragraph>
              <Space align="center">
                <Title
                  level={3}
                  style={{ fontWeight: "bolder", color: "#004AAD", margin: 0 }}
                >
                  Amount:
                </Title>
                <Tag color="processing">
                  {request.numOfAdult} adults, {request.numOfChild} children
                </Tag>
              </Space>
            </Space>
          </Space>
          <Space direction="vertical">{renderButtons()}</Space>
        </Space>
      </Card>
      {contextHolder}
    </>
  );
};

export default RequestCardTourGuide;

type Action = { name: string; action: () => void };
