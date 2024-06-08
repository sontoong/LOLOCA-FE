import Banner from "../../components/banner/banner";
import VietNamBanner from "../../../assets/banner.png";
import {
  Card,
  Col,
  Dropdown,
  MenuProps,
  Pagination,
  Row,
  Space,
  Typography,
} from "antd";
import { cities } from "../../utils/testData";
import { DownOutlined } from "@ant-design/icons";

export default function CitiesPage() {
  const { Title, Paragraph } = Typography;

  const filterItems: MenuProps["items"] = [
    {
      label: "Great Job",
      key: "1",
    },
    {
      label: "Keep Going",
      key: "2",
    },
    {
      label: "We'll be fine",
      key: "3",
    },
  ];

  return (
    <div>
      <Banner
        image={VietNamBanner}
        title={"Viet Nam"}
        description={
          "Việt Nam, một đất nước tuy nhỏ nhưng đa dạng về văn hóa, phong cảnh và ẩm thực. Từ những dãy núi hùng vĩ đến những bãi biển tuyệt đẹp, Việt Nam là điểm đến hấp dẫn của du khách."
        }
      />
      <div className="mt-[3%]">
        <Dropdown menu={{ items: filterItems }} trigger={["click"]}>
          <a
            onClick={(e) => e.preventDefault()}
            className="text-black text-[1.5rem] font-bold ml-[4%]"
          >
            <Space>
              Click me
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
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
              <Paragraph ellipsis={{ rows: 3, expandable: false }}>{city.description}</Paragraph>
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
