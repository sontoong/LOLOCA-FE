import { useEffect, useState } from "react";
import { TableProps } from "antd";
import { Table } from "../../components/table";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import { useNavigate } from "react-router-dom";
import DropDownRequest from "../../ui/customer_ui/dropDownRequest";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";

const CustomerRequestList = () => {
  const navigate = useNavigate();
  const { state: stateBookingTour, handleGetBookingTourByCustomerId } =
    useBookingTour();
  const {
    state: stateBookingTourGuide,
    handleGetBookingTourGuideByCustomerId,
  } = useBookingTourGuide();
  const [currentTable, setCurrentTable] = useState("tour");

  const userId = localStorage.getItem("userId") ?? "";
  useEffect(() => {
    handleGetBookingTourByCustomerId({ customerId: userId });
    handleGetBookingTourGuideByCustomerId({ customerId: userId });
  }, [
    handleGetBookingTourByCustomerId,
    handleGetBookingTourGuideByCustomerId,
    userId,
  ]);

  const handlePaymentNavigation = (record: any) => {
    navigate(`/customer/payment/${record.key}?type=${currentTable}`);
  };

  const bookingTourColumns: TableProps["columns"] = [
    {
      title: "Tour",
      dataIndex: "tour",
      key: "tour",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <DropDownRequest
          tableType={currentTable}
          record={record}
          handlePaymentNavigation={handlePaymentNavigation}
        />
      ),
    },
  ];

  const bookingTourGuideColumns: TableProps["columns"] = [
    {
      title: "Tour Guide",
      dataIndex: "tour_guide",
      key: "tour_guide",
    },
    {
      title: "Tour",
      dataIndex: "tour",
      key: "tour",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <DropDownRequest
          tableType={currentTable}
          record={record}
          handlePaymentNavigation={handlePaymentNavigation}
        />
      ),
    },
  ];

  const tourData = stateBookingTour.currentBookingTourList;
  const tourGuideData = stateBookingTourGuide.currentBookingTourGuideList;

  return (
    <div className="mx-[4rem] my-[2rem]">
      <div className="mb-[2rem]">
        {currentTable === "tour" ? (
          <OutlineButton.BoldText
            text="Show Tour Table"
            onClick={() => setCurrentTable("tour")}
            className="mr-[1rem]"
          />
        ) : (
          <PrimaryButton
            text="Show Tour Table"
            onClick={() => setCurrentTable("tour")}
            className="mr-[1rem]"
          />
        )}
        {currentTable === "tour-guide" ? (
          <OutlineButton.BoldText
            text="Show Tour Guide Table"
            onClick={() => setCurrentTable("tour-guide")}
          />
        ) : (
          <PrimaryButton
            text="Show Tour Guide Table"
            onClick={() => setCurrentTable("tour-guide")}
          />
        )}
      </div>
      {currentTable === "tour" ? (
        <Table columns={bookingTourColumns} dataSource={tourData} />
      ) : (
        <Table columns={bookingTourGuideColumns} dataSource={tourGuideData} />
      )}
    </div>
  );
};

export default CustomerRequestList;
