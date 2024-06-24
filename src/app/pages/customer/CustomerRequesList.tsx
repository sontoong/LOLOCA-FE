import { useState } from "react";
import { TableProps } from "antd";
import { Table } from "../../components/table";
import { PrimaryButton } from "../../components/buttons";
import OutlineButton from "../../components/buttons/outline-button";
import { useNavigate } from "react-router-dom";

const CustomerRequesList = () => {
  const [currentTable, setCurrentTable] = useState("tour");
  const navigate = useNavigate();

  const handleRowClick = (record: any) => {
    navigate(`/customer/payment/${record.key}`);
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
  ];

  const tourData = [
    {
      key: "1",
      tour: "Tour A",
      start_date: "2024-07-01",
      end_date: "2024-07-07",
      total: "$1000",
      status: "Confirmed",
    },
    {
      key: "2",
      tour: "Tour B",
      start_date: "2024-07-10",
      end_date: "2024-07-15",
      total: "$1500",
      status: "Pending",
    },
    {
      key: "3",
      tour: "Tour C",
      start_date: "2024-08-01",
      end_date: "2024-08-05",
      total: "$2000",
      status: "Cancelled",
    },
  ];

  const tourGuideData = [
    {
      key: "1",
      tour_guide: "Guide A",
      tour: "Tour A",
      start_date: "2024-07-01",
      end_date: "2024-07-07",
      total: "$1000",
      status: "Confirmed",
    },
    {
      key: "2",
      tour_guide: "Guide B",
      tour: "Tour B",
      start_date: "2024-07-10",
      end_date: "2024-07-15",
      total: "$1500",
      status: "Pending",
    },
    {
      key: "3",
      tour_guide: "Guide C",
      tour: "Tour C",
      start_date: "2024-08-01",
      end_date: "2024-08-05",
      total: "$2000",
      status: "Cancelled",
    },
  ];

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
        {currentTable === "tourGuide" ? (
          <OutlineButton.BoldText
            text="Show Tour Guide Table"
            onClick={() => setCurrentTable("tourGuide")}
          />
        ) : (
          <PrimaryButton
            text="Show Tour Guide Table"
            onClick={() => setCurrentTable("tourGuide")}
          />
        )}
      </div>
      {currentTable === "tour" ? (
        <Table
          columns={bookingTourColumns}
          dataSource={tourData}
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record),
            };
          }}
        />
      ) : (
        <Table
          columns={bookingTourGuideColumns}
          dataSource={tourGuideData}
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record),
            };
          }}
        />
      )}
    </div>
  );
};

export default CustomerRequesList;
