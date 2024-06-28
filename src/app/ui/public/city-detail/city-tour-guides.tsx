import { Card, Pagination, PaginationProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../../components/image";
import NotFound from "../../../components/not-found/not-found";
import { useTourGuide } from "../../../hooks/useTourGuide";
import { CardListGrid } from "../../../components/grids";
import { CardSkeleton } from "../../../components/skeletons";

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
      return (
        <CardListGrid
          items={15}
          render={() => <CardSkeleton.ImageVertical />}
        />
      );
    }

    if (renderToursGuides) {
      return (
        <>
          <CardListGrid
            items={renderToursGuides.tourGuides}
            render={(guide) => {
              if (guide) {
                return (
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
                );
              }
            }}
          />
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

  return <div className="m-10">{renderContent()}</div>;
}
