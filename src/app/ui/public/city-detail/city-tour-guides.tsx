import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../../components/image";
import NotFound from "../../../components/not-found/not-found";
import { useTourGuide } from "../../../hooks/useTourGuide";
import { CardListGrid } from "../../../components/grids";
import { CardSkeleton } from "../../../components/skeletons";
import { Card } from "../../../components/card";

export default function CityTourGuides() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);
  const { state: stateTourGuide, handleGetAllTourGuidesInCity } =
    useTourGuide();

  useEffect(() => {
    if (cityId) {
      handleGetAllTourGuidesInCity({
        cityId: cityId,
      });
    }
  }, [cityId, currentPage, currentPageSize, handleGetAllTourGuidesInCity]);

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
    if (stateTourGuide.isFetching) {
      return (
        <CardListGrid
          items={15}
          render={() => <CardSkeleton.ImageVertical />}
        />
      );
    }
    if (stateTourGuide.currentTourGuideList.tourGuides) {
      return (
        <>
          <CardListGrid
            items={stateTourGuide.currentTourGuideList.tourGuides}
            render={(guide) => {
              if (guide) {
                return (
                  <Card
                    title={`${guide.firstName} ${guide.lastName}`}
                    description={guide.description}
                    className="h-[390px]"
                    hoverable
                    onClick={() => handleCardClick(guide.tourGuideId)}
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
                  />
                );
              }
            }}
          />
          <div className="mb-[2%] mr-[5%] mt-5 flex justify-end">
            <Pagination
              current={currentPage}
              onChange={onChangePage}
              total={stateTourGuide.currentTourGuideList.totalPage}
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
