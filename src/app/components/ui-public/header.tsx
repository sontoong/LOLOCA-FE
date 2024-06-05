import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, MenuProps, Modal, Spin } from "antd";
import { Header } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../redux/hook";

export default function MyHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);

  const { state, handleLogout } = useAuth();

  const logOut = async () => {
    handleLogout({ userId: "abc" }, navigate);
  };

  function generateItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: ItemType[]
  ): ItemType {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const getHeader = (): ItemType[] => {
    switch (currentUser.role) {
      case "candidate":
        return [
          generateItem("Tìm Project", "/projects"),
          generateItem("Quản Lý Project", "/fd/projects"),
          generateItem("Thống Kê", "/fd/report", "", [
            {
              label: "Thống Kê Thu Nhập",
              key: "/fd/report/earnings",
            },
            {
              label: "Lịch Sử Giao Dịch",
              key: "/fd/report/transactions",
            },
          ]),
        ];
      case "enterprise":
        return [
          generateItem("Quản Lý Project", "abc", "", [
            { label: "Danh Sách Project", key: "/ed/projects" },
            { label: "Đăng Tuyển Dụng", key: "/ed/new-project" },
          ]),
          generateItem("Tìm Hồ Sơ", "/candidates"),
          generateItem("Thống Kê", "/ed/report", "", [
            { label: "Lịch Sử Giao Dịch", key: "/ed/report/transactions" },
          ]),
        ];
      default:
        return [
          generateItem("Cities", "/city"),
          generateItem("Tours", "/tour"),
          generateItem("Guides", "/guide"),
        ];
    }
  };

  const getProfileDropdown = (): ItemType[] => {
    switch (currentUser.role) {
      case "candidate":
        return [
          generateItem(
            <Link to={`/fd/account`}>Thông tin cá nhân</Link>,
            "/account",
            <UserOutlined />
          ),
          generateItem(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
      case "enterprise":
        return [
          generateItem(
            <Link to={`/ed/account`}>Thông tin cá nhân</Link>,
            "/account",
            <UserOutlined />
          ),
          generateItem(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
      default:
        return [
          generateItem(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) navigate(e.key);
  };
  return (
    <Header className="fixed z-50 flex w-full border-b border-gray-200 bg-white px-5">
      <img
        alt=""
        className="px-10 py-1 hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      <Menu
        mode="horizontal"
        items={getHeader()}
        style={{ flex: 1, minWidth: 0 }}
        selectedKeys={location.pathname
          .split("/")
          .slice(1)
          .map((_, index, arr) => `/${arr.slice(0, index + 1).join("/")}`)}
        onClick={onClick}
      />
      {Object.values(currentUser).length ? (
        <Dropdown
          menu={{ items: getProfileDropdown() }}
          placement="bottomRight"
          trigger={["click"]}
          arrow
        >
          <Avatar
            className="fixed right-4 top-3 cursor-pointer"
            size={"large"}
            icon={<UserOutlined />}
            src={currentUser.avatar}
          />
        </Dropdown>
      ) : (
        <Button
          className="self-center"
          type="default"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </Button>
      )}
      <Modal footer={null} closable={false} open={state.isFetching}>
        <div className="flex flex-col items-center justify-center">
          <Spin size="large"></Spin>
          <span>Đang đăng xuất...</span>
        </div>
      </Modal>
    </Header>
  );
}
