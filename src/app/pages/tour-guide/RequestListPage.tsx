import { useState } from "react";
import { Pagination, PaginationProps, Space } from "antd";
import RequestCard from "../../ui/guide_ui/requestCard";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";

const RequestListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(8);
    
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

  const requestForMe = [
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    // Add more request data as needed
  ];

  const requestForTour = [
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    // Add more request data as needed
  ];

  const requestAccepted = [
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    // Add more request data as needed
  ];

  const tourAccepted = [
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    {
      name: "Some Guy",
      email: "someguy@gmail.com",
      tripName: "Cool Trip",
      tag: "Funny",
      tags: ["Funny", "Adventure", "Exciting"],
      description: "This is a cool trip. idk",
      amount: {
        adults: 2,
        children: 1,
      },
    },
    // Add more request data as needed
  ];

  const [requestData, setRequestData] = useState(requestForMe);
  const [activeButton, setActiveButton] = useState(
    "RequestForMe"
  );

  const handleRequestForMe = () => {
    setRequestData(requestForMe);
    setActiveButton("RequestForMe");
  };

  const handleRequestForTour = () => {
    setRequestData(requestForTour);
    setActiveButton("RequestForTour");
  };

  const handleRequestAccepted = () => {
    setRequestData(requestAccepted);
    setActiveButton("RequestAccepted");
  };

  const handleTourAccepted = () => {
    setRequestData(tourAccepted);
    setActiveButton("TourAccepted");
  };

  return (
    <div className="my-[2rem] ml-[15rem]">
      <Space direction="horizontal" size="middle" className="mb-4">
        {activeButton === "RequestForMe" ? (
          <OutlineButton onClick={handleRequestForMe} text="Request for me" />
        ) : (
          <PrimaryButton onClick={handleRequestForMe} text="Request for me" />
        )}
        {activeButton === "RequestForTour" ? (
          <OutlineButton
            onClick={handleRequestForTour}
            text="Request for tour"
          />
        ) : (
          <PrimaryButton
            onClick={handleRequestForTour}
            text="Request for tour"
          />
        )}
        {activeButton === "RequestAccepted" ? (
          <OutlineButton
            onClick={handleRequestAccepted}
            text="Request accepted"
          />
        ) : (
          <PrimaryButton
            onClick={handleRequestAccepted}
            text="Request accepted"
          />
        )}
        {activeButton === "TourAccepted" ? (
          <OutlineButton onClick={handleTourAccepted} text="Tour accepted" />
        ) : (
          <PrimaryButton onClick={handleTourAccepted} text="Tour accepted" />
        )}
      </Space>
      <Space direction="vertical" size={"large"} className="w-[70%]">
        {requestData.map((request, index) => (
          <RequestCard key={index} request={request} activeButton={activeButton} />
        ))}
      </Space>
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
