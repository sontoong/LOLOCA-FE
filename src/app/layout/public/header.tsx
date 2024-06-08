import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Modal, Spin } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { PrimaryButton } from "../../components/buttons";
import { ROLE } from "../../../constants/role";
import { useEffect, useRef } from "react";
import { useCustomer } from "../../hooks/useCustomer";
import { useTourguide } from "../../hooks/useTourguide";
import { Customer, Tourguide } from "../../models/user";

const { Header } = Layout;

export default function MyHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, handleLogout, handleGetUserInfo } = useAuth();
  const { currentCustomer } = useCustomer().state;
  const { currentTourguide } = useTourguide().state;

  const user = useRef({} as Customer | Tourguide);

  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);

  useEffect(() => {
    switch (state.currentUser.Role) {
      case ROLE.customer:
        user.current = currentCustomer;
        break;
      case ROLE.tourguide:
        user.current = currentTourguide;
        break;
      default:
        break;
    }
  }, [currentCustomer, currentTourguide, state.currentUser.Role]);

  const logOut = async () => {
    handleLogout(navigate);
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
            <UserOutlined />
          ),
          {
            type: "divider",
          },
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
      case ROLE.tourguide:
        return [
          generateItemProfile(
            <Link to={`/ed/account`}>Thông tin cá nhân</Link>,
            "/account",
            <UserOutlined />
          ),
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
      default:
        return [
          generateItemProfile(
            <div onClick={logOut}>Đăng xuất</div>,
            "",
            <LogoutOutlined />
          ),
        ];
    }
  }

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) navigate(e.key);
  };

  return (
    <>
      <Header className="fixed z-50 flex w-full  bg-white ">
        <img
          alt=""
          className="px-10 py-1 hover:cursor-pointer"
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
        {localStorage.getItem("access_token") ? (
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
              src={user.current?.avatar}
            />
          </Dropdown>
        ) : (
          <PrimaryButton
            text="Get started"
            className="rounded-full self-center"
            bgColor="#000000"
            size="middle"
            onClick={() => navigate("/login")}
          />
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
  children?: ItemType[]
): ItemType {
  return {
    key,
    icon,
    children,
    label: <span className="font-bold text-lg">{label}</span>,
  };
}

function generateItemProfile(
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
