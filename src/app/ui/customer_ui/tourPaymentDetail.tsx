import { Divider } from "../../components/divider";
import { Typography } from "antd";
import { Tour } from "../../models/tour";
import { Image } from "../../components/image";

const { Title, Paragraph } = Typography;

const TourPaymentDetail = ({ tourDetails }: { tourDetails: Tour }) => {
  return (
    <div>
      <Title level={3} style={{ fontWeight: "bolder" }}>
        Payment Detail
      </Title>
      <Divider colorSplit="black" />
      <div className="flex items-center">
        <Image
          src={
            tourDetails.tourImgViewList
              ? tourDetails.tourImgViewList[0].imagePath
              : undefined
          }
          style={{ objectFit: "cover", width: "6rem", aspectRatio: 1 / 1 }}
        />
        <div className="ml-[2rem]">
          <Title level={5} style={{ fontWeight: "bolder" }}>
            {tourDetails.name}
          </Title>
          <Paragraph>{tourDetails.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TourPaymentDetail;
