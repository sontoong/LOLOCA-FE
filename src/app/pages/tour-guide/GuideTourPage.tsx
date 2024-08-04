import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Pagination, PaginationProps, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VietNamBanner from "../../../assets/banner.png";
import Banner from "../../components/banner/banner";
import { Image } from "../../components/image";
import NotFound from "../../components/not-found/not-found";
import { useTour } from "../../hooks/useTour";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton } from "../../components/skeletons";
import { Card } from "../../components/card";

export default function GuideTourPage() {
  const navigate = useNavigate();
  const { state: stateTour, handleGetTourByTourGuide } = useTour();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const renderTours = stateTour.currentTourList;

  useEffect(() => {
    const tourGuideId = localStorage.getItem("userId");

    if (tourGuideId) {
      handleGetTourByTourGuide({
        page: currentPage,
        pageSize: currentPageSize,
        TourGuideId: tourGuideId,
      });
    }
  }, [currentPage, currentPageSize, handleGetTourByTourGuide]);

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
    navigate(`/guide/tours/${tourId}`);
  };

  const renderContent = () => {
    if (stateTour.isFetching) {
      return (
        <div className="m-10">
          <CardListGrid
            items={15}
            render={() => <CardSkeleton.ImageVertical />}
          />
        </div>
      );
    }

    if (renderTours.tours) {
      return (
        <div className="m-10">
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
          <div className="mb-[2%] mr-[5%] flex justify-end">
            <Pagination
              current={currentPage}
              onChange={onChangePage}
              total={renderTours?.totalPage}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </div>
      );
    }

    return <NotFound />;
  };

  return (
    <div>
      <Banner image={VietNamBanner} title={"Danh sách tour"} />
      <div className="mt-[3%]">
        <Dropdown menu={{ items: filterItems }} trigger={["click"]}>
          <a
            onClick={(e) => e.preventDefault()}
            className="ml-[4%] text-[1.5rem] font-bold text-black"
          >
            <Space>
              Filters
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
