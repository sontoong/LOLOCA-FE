import { Card, Col, Pagination, PaginationProps, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../components/image";
import { Loader } from "../../components/loader/loader";
import NotFound from "../../components/not-found/not-found";
import { useTourGuide } from "../../hooks/useTourGuide";

const { Title, Paragraph } = Typography;

export default function CityTourGuides() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);
  const { state, handleGetRandomTourGuidesInCity } = useTourGuide();

  const renderToursGuides = state.currentTourGuideList;

  useEffect(() => {
    if (cityId) {
      handleGetRandomTourGuidesInCity({
        page: currentPage,
        pageSize: currentPageSize,
        CityId: parseInt(cityId),
      });
    }
  }, [cityId, currentPage, currentPageSize, handleGetRandomTourGuidesInCity]);

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

  const handleCardClick = (tourGuideId: number) => {
    navigate(`/guides/${tourGuideId}`);
  };

  const renderContent = () => {
    if (state.isFetching) {
      return <Loader />;
    }

    if (renderToursGuides) {
      return (
        <>
          <Row gutter={[16, 16]} style={{ margin: "2%" }}>
            {renderToursGuides.tourGuides?.map((guide, index) => (
              <Col span={6} key={index}>
                <Card
                  className="h-[390px]"
                  hoverable
                  onClick={() => handleCardClick(guide.id)}
                  cover={
                    <Image
                      alt={guide.firstName}
                      src={guide.avatar}
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
                    {`${guide.firstName} ${guide.lastName}`}
                  </Title>
                  <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                    {guide.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mb-[2%] mr-[5%] flex justify-end">
            <Pagination
              current={currentPage}
              onChange={onChangePage}
              total={renderToursGuides?.totalPage}
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
