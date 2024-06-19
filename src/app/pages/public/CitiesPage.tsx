import Banner from "../../components/banner/banner";
import VietNamBanner from "../../../assets/banner.png";
import {
  Card,
  Col,
  Dropdown,
  Image,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCity } from "../../hooks/useCity";
import { useEffect } from "react";
import { Loader } from "../../components/loader/loader";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/not-found/not-found";
import { defaultImage } from "../../../constants/images";

const { Title, Paragraph } = Typography;

export default function CitiesPage() {
  const navigate = useNavigate();
  const { state, handleGetCities } = useCity();

  const renderCities = state.cityList;

  useEffect(() => {
    handleGetCities();
  }, [handleGetCities]);

  const renderContent = () => {
    if (state.isFetching) {
      return <Loader />;
    }

    if (renderCities) {
      return (
        <>
          <Row gutter={[16, 16]} style={{ margin: "2%" }}>
            {renderCities.map((city, index) => (
              <Col span={6} key={index}>
                <Card
                  className="h-[390px]"
                  hoverable
                  cover={
                    <Image
                      src={city?.cityThumbnail}
                      fallback={defaultImage}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      preview={false}
                    />
                  }
                  onClick={() => navigate(`/cities/${city?.cityId}`)}
                >
                  <Title level={2} className="mt-0">
                    {city?.name}
                  </Title>
                  <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                    {city?.cityDescription}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          {/* <div className="flex justify-end mr-[5%] mb-[2%]">
            <Pagination
              current={currentPage}
              onChange={onChangePage}
              total={renderTours?.totalPage}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div> */}
        </>
      );
    }

    return <NotFound />;
  };

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
            className="ml-[4%] text-[1.5rem] font-bold text-black"
          >
            <Space>
              Click me
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      {renderContent()}
      {/* <div className="flex justify-end">
        <Pagination defaultCurrent={1} total={500} className="mb-[1%] mr-[2%]"/>
      </div> */}
    </div>
  );
}

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
