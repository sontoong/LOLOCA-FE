import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import { MenuProps } from "antd/lib";
import { formatDateToLocal } from "../../utils/utils";

const DropDownRequest = ({
  record,
  handlePaymentNavigation,
  tableType,
}: {
  record: any;
  handlePaymentNavigation: any;
  tableType: string;
}) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleViewDetail = () => {
    if (tableType === "tour") {
      modal.info({
        title: "Tour Booking Details",
        content: (
          <div>
            <p>
              <strong>Tour Name:</strong> {record.tourName}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDateToLocal(record.startDate)}
            </p>
            <p>
              <strong>End Date:</strong> {formatDateToLocal(record.endDate)}
            </p>
            <p>
              <strong>Note:</strong> {record.note}
            </p>
            <p>
              <strong>Number of Adults:</strong> {record.numOfAdult}
            </p>
            <p>
              <strong>Number of Children:</strong> {record.numOfChild}
            </p>
          </div>
        ),
        onOk() {},
      });
    } else if (tableType === "tour-guide") {
      modal.info({
        title: "Tour Guide Booking Details",
        content: (
          <div>
            <p>
              <strong>Tour Guide Name:</strong> {record.tourGuideName}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDateToLocal(record.startDate)}
            </p>
            <p>
              <strong>End Date:</strong> {formatDateToLocal(record.endDate)}
            </p>
            <p>
              <strong>Note:</strong> {record.note}
            </p>
            <p>
              <strong>Number of Adults:</strong> {record.numOfAdult}
            </p>
            <p>
              <strong>Number of Children:</strong> {record.numOfChild}
            </p>
            <p>
              <strong>Tour Types:</strong>{" "}
              {record.tourTypeDTOs
                ?.map((type: any) => type.typeDetail)
                .join(", ")}
            </p>
          </div>
        ),
        onOk() {},
      });
    }
  };

  const handleProceedToPayment = () => {
    handlePaymentNavigation(record);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "View detail",
      onClick: handleViewDetail,
    },
    {
      key: "2",
      label: "Proceed to Payment",
      onClick: handleProceedToPayment,
      disabled: record.status !== 1,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined />
        </a>
      </Dropdown>
      {contextHolder}
    </>
  );
};

export default DropDownRequest;
