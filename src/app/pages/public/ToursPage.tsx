import Banner from "../../components/banner/banner";
import VietNamBanner from "../../../assets/banner.png";
import {
  Card,
  Col,
  Dropdown,
  Image,
  MenuProps,
  Pagination,
  PaginationProps,
  Row,
  Space,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTour } from "../../hooks/useTour";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { defaultImage } from "../../../constants/images";

const { Title, Paragraph } = Typography;

export default function ToursPage() {
  const [searchParams] = useSearchParams();
  const { state, handleGetTourRandom, handleGetTourByCityId } = useTour();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const currentCity = searchParams.get("city");
  const renderTours = currentCity ? state.currentCityTours : state.randomTours;

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    setCurrentPageSize(pageSize);
  };

  useEffect(() => {
    if (currentCity) {
      handleGetTourByCityId({
        page: currentPage,
        pageSize: currentPageSize,
        cityId: parseInt(currentCity),
      });
    } else {
      handleGetTourRandom({ page: currentPage, pageSize: currentPageSize });
    }
  }, [
    currentPage,
    currentPageSize,
    handleGetTourRandom,
    handleGetTourByCityId,
    currentCity,
  ]);

  return (
    <div>
      <Banner
        image={VietNamBanner}
        title={"Các tour ở Việt Nam"}
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
      {state.isFetching ? (
        <Loader />
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ margin: "2%" }}>
            {renderTours.tours.map((tour, index) => (
              <Col span={6} key={index}>
                <Card
                  className="h-[390px]"
                  hoverable
                  cover={
                    <Image
                      alt={tour.name}
                      src={tour.thumbnailTourImage ?? "error"}
                      fallback={defaultImage}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Title level={2} className="mt-0">
                    {tour.name}
                  </Title>
                  <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                    {tour.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="flex justify-end mr-[5%]">
            <Pagination
              current={currentPage}
              onChange={onChangePage}
              total={renderTours.totalPage}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </>
      )}
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
