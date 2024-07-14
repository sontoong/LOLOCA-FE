import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import { MenuProps } from "antd/lib";
import { useNavigate } from "react-router-dom";

const DropDownTourCard = ({tourId, name} : {tourId: number, name: string}) => {
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
      label: "Edit Tour",
      onClick: handleUpdateTour,
    },
    {
      key: "2",
      label: "Delete Tour",
      onClick: handleDeleteTour,
    },
  ];




  return (
    <Dropdown menu={{ items }} trigger={["click"]} className="text-[2rem]">
        <EllipsisOutlined />
    </Dropdown>
  );
};

export default DropDownTourCard;
