import Banner from "../../components/banner/banner";
import VietNamBanner from "../../../assets/banner.png";
import { Card, Col, Pagination, Row, Typography } from "antd";
import { cities } from "../../utils/testData";

export default function CitiesPage() {
  const { Title, Text } = Typography;

  return (
    <div>
      <Banner
        image={VietNamBanner}
        title={"Viet Nam"}
        description={
          "Việt Nam, một đất nước tuy nhỏ nhưng đa dạng về văn hóa, phong cảnh và ẩm thực. Từ những dãy núi hùng vĩ đến những bãi biển tuyệt đẹp, Việt Nam là điểm đến hấp dẫn của du khách."
        }
      />
      <Row gutter={[16, 16]} style={{ margin: "2%" }}>
        {cities.map((city, index) => (
          <Col span={6} key={index}>
            <Card
              className="h-[390px]"
              hoverable
              cover={
                <img
                  alt={city.title}
                  src={VietNamBanner}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              }
            >
              <Title level={2} className="mt-0">
                {city.title}
              </Title>
              <Text>{city.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="flex justify-end mr-[5%]">
        <Pagination defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}
