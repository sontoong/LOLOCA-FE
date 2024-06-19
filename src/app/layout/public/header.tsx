import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Modal, Spin } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { PrimaryButton } from "../../components/buttons";
import { ROLE } from "../../../constants/role";
import { useEffect } from "react";
import { useCustomer } from "../../hooks/useCustomer";
import { useTourGuide } from "../../hooks/useTourGuide";
import { isEmptyObject } from "../../utils/utils";
import { Customer, TourGuide } from "../../models/user";

const { Header } = Layout;

export default function MyHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, handleLogout, handleGetUserInfo } = useAuth();
  const { currentUser: currentUserCustomer } = useCustomer().state;
  const { currentUser: currentUserTourGuide } = useTourGuide().state;

  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);

  let user = {} as Customer | TourGuide;
  switch (state.currentUser.Role) {
    case ROLE.customer:
      user = currentUserCustomer;
      break;
    case ROLE.tourguide:
      user = currentUserTourGuide;
      break;
    default:
      break;
  }

  const logOut = async () => {
    handleLogout();
  };

  function getHeader(): ItemType[] {
    switch (state.currentUser.Role) {
      case ROLE.customer:
        return [
          generateItem("Cities", "/cities", ""),
          generateItem("Tours", "/tours"),
          generateItem("Guides", "/guides"),
        ];
      case ROLE.tourguide:
        return [
          generateItem("Quản Lý Project", "abc", "", [
            generateItem("abc", "abc"),
          ]),
        ];
      default:
        return [
          generateItem("Cities", "/cities"),
          generateItem("Tours", "/tours"),
          generateItem("Guides", "/guides"),
        ];
    }
  }

  function getProfileDropdown(): ItemType[] {
    switch (state.currentUser.Role) {
      case ROLE.customer:
        return [
          generateItemProfile(
            <Link to={`/fd/account`}>Thông tin cá nhân</Link>,
            "/account",
            <UserOutlined />,
          ),
          {
            type: "divider",
          },
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />,
          ),
        ];
      case ROLE.tourguide:
        return [
          generateItemProfile(
            <Link to={`/ed/account`}>Thông tin cá nhân</Link>,
            "/account",
            <UserOutlined />,
          ),
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />,
          ),
        ];
      default:
        return [
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />,
          ),
        ];
    }
  }

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) navigate(e.key);
  };

  return (
    <>
      <Header className="sticky top-0 z-50 flex w-full  items-center bg-white">
        <img
          alt=""
          className="w-[150px] hover:cursor-pointer"
          onClick={() => navigate("/")}
          src={logo}
        />
        <Menu
          mode="horizontal"
          items={getHeader()}
          style={{
            flex: 1,
            minWidth: 0,
            borderBottom: "none",
          }}
          selectedKeys={location.pathname
            .split("/")
            .slice(1)
            .map((_, index, arr) => `/${arr.slice(0, index + 1).join("/")}`)}
          onClick={onClick}
        />
        {isEmptyObject(state.currentUser) ? (
          <PrimaryButton
            text="Get started"
            className="self-center rounded-full"
            bgColor="#000000"
            size="middle"
            onClick={() => navigate("/login")}
          />
        ) : (
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
              src={user?.avatar}
            />
          </Dropdown>
        )}
      </Header>
      <Modal footer={null} closable={false} open={state.isFetching}>
        <div className="flex flex-col items-center justify-center">
          <Spin size="large"></Spin>
          <span>Đang đăng xuất...</span>
        </div>
      </Modal>
    </>
  );
}

function generateItem(
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemType[],
): ItemType {
  return {
    key,
    icon,
    children,
    label: <span className="text-lg font-bold">{label}</span>,
  };
}

function generateItemProfile(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemType[],
): ItemType {
  return {
    key,
    icon,
    children,
    label,
  };
}
