import { Divider } from '../../components/divider';
import { Image, Typography } from 'antd';

type tourDetailModel = {
  image: string;
  name: string;
  description: string;
};

const TourGuidePaymentDetail = ({ tourDetails }: { tourDetails: tourDetailModel }) => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <Title level={3} style={{ fontWeight: 'bolder' }}>
        Payment Detail
      </Title>
      <Divider colorSplit="black" />
      <div className="flex items-center">
        <Image
          src={tourDetails.image}
          
          style={{ objectFit: 'cover', width:"6rem", aspectRatio: 1 / 1 }}
        />
        <div className="ml-[2rem]">
          <Title level={5} style={{ fontWeight: 'bolder' }}>
            Request for {tourDetails.name}
          </Title>
          <Paragraph>{tourDetails.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TourGuidePaymentDetail;
