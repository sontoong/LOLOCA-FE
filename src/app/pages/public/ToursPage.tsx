import { DownOutlined } from "@ant-design/icons";
import {
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  PaginationProps,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VietNamBanner from "../../../assets/banner.png";
import Banner from "../../components/banner/banner";
import { Image } from "../../components/image";
import NotFound from "../../components/not-found/not-found";
import { useTour } from "../../hooks/useTour";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton } from "../../components/skeletons";

const { Title, Paragraph } = Typography;

export default function ToursPage() {
  const navigate = useNavigate();
  const { state: stateTour, handleGetTourRandom } = useTour();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const renderTours = stateTour.currentTourList;

  useEffect(() => {
    handleGetTourRandom({ page: currentPage, pageSize: currentPageSize });
  }, [currentPage, currentPageSize, handleGetTourRandom]);

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
        </div>
      );
    }

    return <NotFound />;
  };

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
