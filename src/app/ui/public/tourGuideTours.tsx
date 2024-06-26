import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { TourList } from "../../models/tour";
import { Image } from "../../components/image";

const { Title, Paragraph } = Typography;

type HorizontalCardProps = { tours: TourList["tours"] };

const HorizontalCard = ({ tours }: HorizontalCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-[92%] space-x-4 overflow-x-auto p-4">
      {tours?.map((item) => (
        <Card
          key={item.tourId}
          className="h-96 w-80 flex-shrink-0"
          hoverable
          cover={
            <Image
              src={item.thumbnailTourImage}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
              preview={false}
            />
          }
          onClick={() => navigate(`/tours/${item.tourId}`)}
        >
          <Title level={2} className="mt-0">
            {item.name}
          </Title>
          <Paragraph ellipsis={{ rows: 3, expandable: false }}>
            {item.description}
          </Paragraph>
        </Card>
      ))}
    </div>
  );
};

export default HorizontalCard;
