import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal } from "antd";

const DropDownRequest = ({
  record,
  handlePaymentNavigation,
  tableType,
}: {
  record: any;
  handlePaymentNavigation: any;
  tableType: string;
}) => {
  const handleViewDetail = () => {
    if (tableType === "tour") {
      Modal.info({
        title: "Tour Booking Details",
        content: (
          <div>
            <p>
              <strong>Start Date:</strong> {record.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {record.endDate}
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
      Modal.info({
        title: "Tour Guide Booking Details",
        content: (
          <div>
            <p>
              <strong>Tour Guide Name:</strong> {record.tourGuideName}
            </p>
            <p>
              <strong>Start Date:</strong> {record.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {record.endDate}
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
            {/* <p>
              <strong>Tour Types:</strong>{" "}
              {record.tourTypeDTOs
                ?.map((type: any) => type.typeDetail)
                .join(", ")}
            </p> */}
          </div>
        ),
        onOk() {},
      });
    }
  };

  const handleProceedToPayment = () => {
    handlePaymentNavigation(record);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleViewDetail}>
        View detail
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={handleProceedToPayment}
        disabled={record.status !== 1}
      >
        Proceed to Payment
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default DropDownRequest;
