import { Card, Col, Pagination, PaginationProps, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../components/image";
import { Loader } from "../../components/loader/loader";
import NotFound from "../../components/not-found/not-found";
import { useTour } from "../../hooks/useTour";

const { Title, Paragraph } = Typography;

export default function CityTours() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);
  const { state: stateTour, handleGetTourByCityId } = useTour();

  const renderTours = stateTour.currentTourList;

  useEffect(() => {
    if (cityId) {
      handleGetTourByCityId({
        page: currentPage,
        pageSize: currentPageSize,
        cityId: parseInt(cityId),
      });
    }
  }, [cityId, currentPage, currentPageSize, handleGetTourByCityId]);

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize,
  ) => {
    setCurrentPage(current);
    setCurrentPageSize(pageSize);
  };

  const handleCardClick = (tourId: number) => {
    navigate(`/tours/${tourId}`);
  };

  const renderContent = () => {
    if (stateTour.isFetching) {
      return <Loader />;
    }

    if (renderTours) {
      return (
        <>
          <Row gutter={[16, 16]} style={{ margin: "2%" }}>
            {renderTours.tours?.map((tour, index) => (
              <Col span={6} key={index}>
                <Card
                  className="h-[390px]"
                  hoverable
                  onClick={() => handleCardClick(tour.tourId)}
                  cover={
                    <Image
                      alt={tour.name}
                      src={tour.thumbnailTourImage}
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
          <div className="mb-[2%] mr-[5%] flex justify-end">
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

  return <div>{renderContent()}</div>;
}
