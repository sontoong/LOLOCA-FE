import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import { MenuProps } from "antd/lib";
import { useNavigate } from "react-router-dom";

const DropDownRequest = ({tourId, name} : {tourId: string, name: string}) => {
    const navigate = useNavigate()


  const handleUpdateTour = () => {
    navigate(`/guide/tour/edit/${tourId}`);
  };

  const handleDeleteTour = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete this ${name}?`,
      onOk() {
        console.log("Deleting tour:", tourId);
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: "1",
      label: "View detail",
      onClick: handleUpdateTour,
    },
    {
      key: "2",
      label: "Proceed to Payment",
      onClick: handleDeleteTour,
    },
  ];




  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default DropDownRequest;
