import Banner from "../../components/banner/banner";
import { Dropdown, MenuProps, Space, TabsProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCity } from "../../hooks/useCity";
import CityTours from "../../ui/public/city-detail/city-tours";
import CityGuides from "../../ui/public/city-detail/city-tour-guides";
import { Skeleton } from "../../components/skeletons";

export default function ToursPage() {
  const { cityId } = useParams();
  const { state: stateCity, handleGetCityById } = useCity();
  const [currentTab, setCurrentTab] = useState<string>("tours");

  useEffect(() => {
    if (cityId) {
      handleGetCityById({ cityId: cityId });
    }
  }, [cityId, handleGetCityById]);

  const onTabPaneChange = (key: string) => {
    setCurrentTab(key);
  };

  const renderBanner = () => {
    if (stateCity.isFetching) {
      return <Skeleton.Image height={300} />;
    }

    if (stateCity.currentCity) {
      return (
        <Banner
          image={stateCity.currentCity?.cityBanner}
          title={stateCity.currentCity?.name}
          description={stateCity.currentCity?.cityDescription}
          tabPane={{ onTabPaneChange, tabPaneItems, activeKey: currentTab }}
        />
      );
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case "tours": {
        return <CityTours />;
      }

      case "tourguide": {
        return <CityGuides />;
      }

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
