import Banner from "../../components/banner/banner";
import VietNamBanner from "../../../assets/banner.png";
import {
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  PaginationProps,
  Space,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTourGuide } from "../../hooks/useTourGuide";
import NotFound from "../../components/not-found/not-found";
import { useEffect, useState } from "react";
import { Image } from "../../components/image";
import { useNavigate } from "react-router-dom";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton } from "../../components/skeletons";

const { Title, Paragraph } = Typography;

export default function GuidesPage() {
  const navigate = useNavigate();

  const { state: stateTourGuide, handleGetRandomTourGuides } = useTourGuide();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const renderTourGuides = stateTourGuide.currentTourGuideList;

  useEffect(() => {
    handleGetRandomTourGuides({ page: currentPage, pageSize: currentPageSize });
  }, [currentPage, currentPageSize, handleGetRandomTourGuides]);

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
        <div className="m-10">
          <CardListGrid
            items={15}
            render={() => <CardSkeleton.ImageVertical />}
          />
        </div>
      );
    }

    if (renderTourGuides.tourGuides) {
      return (
        <div className="m-10">
          <CardListGrid
            items={renderTourGuides.tourGuides}
            render={(tourGuide) => {
              if (tourGuide) {
                return (
                  <Card
                    className="h-[390px]"
                    hoverable
                    onClick={() => handleCardClick(tourGuide.id)}
                    cover={
                      <Image
                        alt={tourGuide.firstName}
                        src={tourGuide.avatar}
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
                      {`${tourGuide.firstName} ${tourGuide.lastName}`}
                    </Title>
                    <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                      {tourGuide.description}
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
              total={renderTourGuides?.totalPage}
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
