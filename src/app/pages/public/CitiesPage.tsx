import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VietNamBanner from "../../../assets/banner.png";
import Banner from "../../components/banner/banner";
import { Image } from "../../components/image";
import NotFound from "../../components/not-found/not-found";
import { useCity } from "../../hooks/useCity";
import { CardListGrid } from "../../components/grids";
import { CardSkeleton } from "../../components/skeletons";
import { Card } from "../../components/card";

export default function CitiesPage() {
  const navigate = useNavigate();
  const { state, handleGetCities } = useCity();

  const renderCities = state.cityList;

  useEffect(() => {
    handleGetCities();
  }, [handleGetCities]);

  const renderContent = () => {
    if (state.isFetching) {
      return (
        <div className="m-10">
          <CardListGrid
            items={15}
            render={() => <CardSkeleton.ImageVertical />}
          />
        </div>
      );
    }

    if (renderCities) {
      return (
        <div className="m-10">
          <CardListGrid
            items={renderCities}
            render={(city) => (
              <Card
                title={city?.name}
                description={city?.cityDescription}
                className="h-[390px]"
                hoverable
                cover={
                  <Image
                    src={city?.cityThumbnail}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                    preview={false}
                  />
                }
                onClick={() => navigate(`/cities/${city?.cityId}`)}
              />
            )}
          />
          {/* <div className="flex justify-end mr-[5%] mb-[2%]">
              <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={renderTours?.totalPage}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
              />
            </div> */}
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
        height="400px"
      />
      <div className="my-10">
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
      {/* <div className="flex justify-end">
        <Pagination defaultCurrent={1} total={500} className="mb-[1%] mr-[2%]"/>
      </div> */}
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
