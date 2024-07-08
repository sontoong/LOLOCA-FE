import { useEffect, useState } from "react";
import { TableProps } from "antd";
import { Table } from "../../components/table";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import { useNavigate } from "react-router-dom";
import DropDownRequest from "../../ui/customer_ui/dropDownRequest";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";
import { BookingTourRequest } from "../../models/bookingTour";
import { BookingTourGuideRequest } from "../../models/bookingTourGuide";
import { bookingStatusGenerator } from "../../utils/generators/bookingStatus";
import { formatCurrency } from "../../utils/utils";

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

  const bookingTourColumns: TableProps<BookingTourRequest>["columns"] = [
    {
      title: "Tour name",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Request date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total) => formatCurrency(total * 1000),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => bookingStatusGenerator(status),
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

  const bookingTourGuideColumns: TableProps<BookingTourGuideRequest>["columns"] =
    [
      {
        title: "Tour Guide",
        dataIndex: "tourGuideName",
        key: "tourGuideName",
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "End Date",
        dataIndex: "requestDate",
        key: "requestDate",
      },
      {
        title: "Total",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (total) => formatCurrency(total * 1000),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => bookingStatusGenerator(status),
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
