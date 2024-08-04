import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../../components/image";
import NotFound from "../../../components/not-found/not-found";
import { useTour } from "../../../hooks/useTour";
import { CardListGrid } from "../../../components/grids";
import { CardSkeleton } from "../../../components/skeletons";
import { Card } from "../../../components/card";

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
      return (
        <CardListGrid
          items={15}
          render={() => <CardSkeleton.ImageVertical />}
        />
      );
    }

    if (renderTours) {
      return (
        <>
          <CardListGrid
            items={renderTours.tours}
            render={(tour) => {
              if (tour) {
                return (
                  <Card
                    title={tour.name}
                    description={tour.description}
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
                  />
                );
              }
            }}
          />
          <div className="mb-[2%] mr-[5%] mt-5 flex justify-end">
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

  return <div className="m-10">{renderContent()}</div>;
}
