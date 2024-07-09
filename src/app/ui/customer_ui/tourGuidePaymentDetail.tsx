import { Divider } from "../../components/divider";
import { Typography } from "antd";
import { TourGuide } from "../../models/tourGuide";
import { Image } from "../../components/image";

const TourGuidePaymentDetail = ({
  tourGuideDetails,
}: {
  tourGuideDetails: TourGuide;
}) => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <Title level={3} style={{ fontWeight: "bolder" }}>
        Payment Detail
      </Title>
      <Divider colorSplit="black" />
      <div className="flex items-center">
        <Image
          src={tourGuideDetails.avatar}
          style={{ objectFit: "cover", width: "6rem", aspectRatio: 1 / 1 }}
        />
        <div className="ml-[2rem]">
          <Title level={5} style={{ fontWeight: "bolder" }}>
            Request for{" "}
            {`${tourGuideDetails.firstName} ${tourGuideDetails.lastName}`}
          </Title>
          <Paragraph>{tourGuideDetails.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TourGuidePaymentDetail;
