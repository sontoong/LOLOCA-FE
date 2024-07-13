import { useEffect, useState } from "react";
import { Pagination, PaginationProps, Space } from "antd";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import Radio from "../../components/radio/Radio";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";
import RequestCardTourGuide from "../../ui/guide_ui/request-card-tourguide";
import RequestCardTour from "../../ui/guide_ui/requestCard";
import NotFound from "../../components/not-found/not-found";

const userId = localStorage.getItem("userId");

const RequestListPage = () => {
  const { state: stateBookingTour, handleGetBookingTourByTourGuideId } =
    useBookingTour();
  const {
    state: stateBookingTourGuide,
    handleGetBookingTourGuideByTourGuideId,
  } = useBookingTourGuide();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);
  const [renderData, setRenderData] = useState<RenderData>();

  useEffect(() => {
    if (userId) {
      handleGetBookingTourByTourGuideId({ tourGuideId: userId });
      handleGetBookingTourGuideByTourGuideId({ tourGuideId: userId });
    }
  }, [
    handleGetBookingTourByTourGuideId,
    handleGetBookingTourGuideByTourGuideId,
  ]);

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

  const renderList = () => {
    switch (renderData?.type) {
      case "bookingTour": {
        if (stateBookingTour.currentBookingTourList.length === 0) {
          return <NotFound />;
        }
        return (
          <Space direction="vertical" size={"large"} className="w-[70%]">
            {stateBookingTour.currentBookingTourList.map((request, index) => {
              return (
                <RequestCardTour
                  key={index}
                  request={request}
                  customerId={request.customerId}
                />
              );
            })}
          </Space>
        );
      }
      case "bookingTourGuide": {
        if (stateBookingTourGuide.currentBookingTourGuideList.length === 0) {
          return <NotFound />;
        }
        return (
          <Space direction="vertical" size={"large"} className="w-[70%]">
            {stateBookingTourGuide.currentBookingTourGuideList.map(
              (request, index) => {
                return (
                  <RequestCardTourGuide
                    key={index}
                    request={request}
                    customerId={request.customerId}
                  />
                );
              },
            )}
          </Space>
        );
      }
      default:
        return [];
    }
  };

  return (
    <div className="my-[2rem] ml-[15rem]">
      <div className="mb-3">
        <Radio.ButtonGroup
          defaultActiveIndex={0}
          items={[
            {
              text: "Request for me",
              onClick: () =>
                setRenderData({
                  type: "bookingTourGuide",
                }),
            },
            {
              text: "Request for tour",
              onClick: () =>
                setRenderData({
                  type: "bookingTour",
                }),
            },
            {
              text: "Request accepted",
              onClick: () =>
                setRenderData({
                  type: "bookingTourGuide",
                }),
            },
            {
              text: "Tour accepted",
              onClick: () =>
                setRenderData({
                  type: "bookingTour",
                }),
            },
          ]}
          activeRender={(item) => <OutlineButton text={item?.text} />}
          render={(item) => (
            <PrimaryButton text={item?.text} onClick={item?.onClick} />
          )}
        />
      </div>
      <div className="my-10">{renderList()}</div>
      <div className="mb-[2%] mr-[5%] flex justify-end">
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          total={currentPageSize}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default RequestListPage;

type RenderData = { type: "bookingTour" | "bookingTourGuide" };
