import { Card, CardProps, ConfigProvider, Typography } from "antd";

const CustomCard = ({ cardTitle, ...rest }: CustomCardProps) => {
  const { Title } = Typography;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#004AAD",
          },
        },
      }}
    >
      <Card
        title={
          <Title
            level={4}
            style={{
              margin: 0,
              textTransform: "uppercase",
              color: "#FFDE59",
              textAlign:"center",
              fontWeight:"bold"
            }}
          >
            {cardTitle}
          </Title>
        }
        {...rest}
      />
    </ConfigProvider>
  );
};

type CustomCardProps = Omit<CardProps, "title"> & {
  cardTitle: string;
};

export default CustomCard;
