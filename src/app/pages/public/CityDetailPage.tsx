import Banner from "../../components/banner/banner";
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
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTour } from "../../hooks/useTour";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, LoaderFullScreen } from "../../components/loader/loader";
import { defaultImage } from "../../../constants/images";
import NotFound from "../../components/not-found/not-found";
import { useCity } from "../../hooks/useCity";

const { Title, Paragraph } = Typography;

export default function ToursPage() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const {
    state: stateTour,
    handleGetTourRandom,
    handleGetTourByCityId,
  } = useTour();
  const { state: stateCity, handleGetCityById } = useCity();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const renderTours = stateTour.currentCityTours;

  useEffect(() => {
    if (cityId) {
      handleGetCityById({ cityId: cityId });
      handleGetTourByCityId({
        page: currentPage,
        pageSize: currentPageSize,
        cityId: parseInt(cityId),
      });
    }
  }, [
    cityId,
    currentPage,
    currentPageSize,
    handleGetTourRandom,
    handleGetTourByCityId,
    handleGetCityById,
  ]);

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

  const handleCardClick = (tourId: number) => {
    navigate(`/tours/${tourId}`);
  };

  const onTabPaneChange = (key: string) => {
    navigate(key);
  };

  const renderContent = () => {
    if (stateTour.isFetching) {
      return <LoaderFullScreen spinning={stateTour.isFetching} />;
    }

    if (renderTours) {
      return (
        <>
          <Row gutter={[16, 16]} style={{ margin: "2%" }}>
            {renderTours.tours.map((tour, index) => (
              <Col span={6} key={index}>
                <Card
                  className="h-[390px]"
                  hoverable
                  onClick={() => handleCardClick(tour.tourId)}
                  cover={
                    <Image
                      alt={tour.name}
                      src={tour.thumbnailTourImage}
                      fallback={defaultImage}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      preview={false}
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
              total={renderTours?.totalPage}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </>
      );
    }

    return <NotFound />;
  };

  const renderBanner = () => {
    if (stateCity.isFetching) {
      return <Loader />;
    }

    if (stateCity.currentCity) {
      return (
        <div>
          <Banner
            image={stateCity.currentCity?.cityBanner}
            title={stateCity.currentCity?.name}
            description={stateCity.currentCity?.cityDescription}
          />
          <Tabs onChange={onTabPaneChange} type="card" items={tabPaneItems} />
        </div>
      );
    }
  };

  return (
    <div>
      {renderBanner()}
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
      {renderContent()}
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

const tabPaneItems: TabsProps["items"] = [
  {
    key: "tours",
    label: "Tours",
  },
  {
    key: "tourguide",
    label: "Tour guides",
  },
];
