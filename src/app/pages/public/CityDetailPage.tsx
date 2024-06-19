import Banner from "../../components/banner/banner";
import { Dropdown, MenuProps, Space, TabsProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTour } from "../../hooks/useTour";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import { useCity } from "../../hooks/useCity";
import CityTours from "../../ui/public/cityTours";
import CityGuides from "../../ui/public/cityGuides";

export default function ToursPage() {
  const { cityId } = useParams();
  const { handleGetTourRandom, handleGetTourByCityId } = useTour();
  const { state: stateCity, handleGetCityById } = useCity();
  const [currentTab, setCurrentTab] = useState<string>("tours");

  useEffect(() => {
    if (cityId) {
      handleGetCityById({ cityId: cityId });
    }
  }, [cityId, handleGetTourRandom, handleGetTourByCityId, handleGetCityById]);

  const onTabPaneChange = (key: string) => {
    setCurrentTab(key);
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
            tabPane={{ onTabPaneChange, tabPaneItems, activeKey: currentTab }}
          />
        </div>
      );
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case "tours":
        return <CityTours />;

      case "tourGuides":
        return <CityGuides />;

      default:
        break;
    }
  };

  return (
    <div>
      {renderBanner()}
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
