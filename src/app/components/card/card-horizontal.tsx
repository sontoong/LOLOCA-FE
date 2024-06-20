import { Card, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

type HorizontalCardProps = {
  data: Array<{
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tourId: string;
  }>;
};

const HorizontalCard = ({ data }: HorizontalCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex overflow-x-auto space-x-4 p-4 w-[92%] mx-auto">
      {data.map((item) => (
        <Card
          key={item.id}
          className="h-96 w-80 flex-shrink-0"
          hoverable
          cover={
            <Image
              src={item.imageUrl}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
              preview={false}
            />
          }
          onClick={() => navigate(`/tour/${item.tourId}`)}
        >
          <Title level={2} className="mt-0">
            {item.title}
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
