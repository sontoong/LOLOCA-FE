import { useEffect, useState } from "react";
import { TableProps } from "antd";
import { Table } from "../../components/table";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import DropDownRequest from "../../ui/customer_ui/dropDownRequest";
import { useBookingTour } from "../../hooks/useBookingTour";
import { useBookingTourGuide } from "../../hooks/useBookingTourGuide";
import { BookingTourRequest } from "../../models/bookingTour";
import { BookingTourGuideRequest } from "../../models/bookingTourGuide";
import { bookingStatusGenerator } from "../../utils/generators/bookingStatus";
import { formatCurrency, formatDateToLocal } from "../../utils/utils";
import { useOrder } from "../../hooks/useOrder";
import { useNavigate } from "react-router-dom";

const CustomerRequestList = () => {
  const navigate = useNavigate();
  const { handleNavigateToPayment } = useOrder();
  const { state: stateBookingTour, handleGetBookingTourByCustomerId } =
    useBookingTour();
  const {
    state: stateBookingTourGuide,
    handleGetBookingTourGuideByCustomerId,
  } = useBookingTourGuide();
  const [currentTable, setCurrentTable] = useState("tour");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      handleGetBookingTourByCustomerId({ customerId: userId });
      handleGetBookingTourGuideByCustomerId({ customerId: userId });
    }
  }, [handleGetBookingTourByCustomerId, handleGetBookingTourGuideByCustomerId]);

  const handlePaymentNavigation = (record: any) => {
    const requestId =
      record.bookingTourRequestId ?? record.bookingTourGuideRequestId;
    const type = record.bookingTourRequestId ? "tour" : "tourGuide";

    handleNavigateToPayment({ id: requestId, type: type }, navigate);
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
      render: (date) => formatDateToLocal(date),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => formatDateToLocal(date),
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (date) => formatDateToLocal(date),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total) => formatCurrency(total),
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
        render: (date) => formatDateToLocal(date),
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (date) => formatDateToLocal(date),
      },
      {
        title: "Request Date",
        dataIndex: "requestDate",
        key: "requestDate",
        render: (date) => formatDateToLocal(date),
      },
      {
        title: "Total",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (total) => formatCurrency(total),
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

  return (
    <div className="mx-[4rem] my-[2rem]">
      <div className="mb-[2rem]">
        {currentTable === "tour" ? (
          <OutlineButton.BoldText
            text="Tour Requests"
            onClick={() => setCurrentTable("tour")}
            className="mr-[1rem]"
          />
        ) : (
          <PrimaryButton
            text="Tour Requests"
            onClick={() => setCurrentTable("tour")}
            className="mr-[1rem]"
          />
        )}
        {currentTable === "tour-guide" ? (
          <OutlineButton.BoldText
            text="Tour Guide Requests"
            onClick={() => setCurrentTable("tour-guide")}
          />
        ) : (
          <PrimaryButton
            text="Tour Guide Requests"
            onClick={() => setCurrentTable("tour-guide")}
          />
        )}
      </div>
      {currentTable === "tour" ? (
        <Table
          columns={bookingTourColumns}
          dataSource={[...stateBookingTour.currentBookingTourList].reverse()}
          rowKey={(record) => record.bookingTourRequestId}
          loading={stateBookingTour.isFetching}
        />
      ) : (
        <Table
          columns={bookingTourGuideColumns}
          dataSource={[
            ...stateBookingTourGuide.currentBookingTourGuideList,
          ].reverse()}
          rowKey={(record) => record.bookingTourGuideRequestId}
          loading={stateBookingTourGuide.isFetching}
        />
      )}
    </div>
  );
};

export default CustomerRequestList;
