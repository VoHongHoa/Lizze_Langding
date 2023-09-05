import React, { useMemo, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderCommon.scss";
import { Modules } from ".";
import { useSelector, useDispatch } from "react-redux";
import Search from "antd/es/input/Search";
import {
  BellFilled,
  ShoppingOutlined,
  UserOutlined,
  PoweroffOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { logout } from "../../redux/userSlice";
import CartComponent from "./Components/CartComponent/CartComponent";
const { Header } = Layout;

function HeaderCommon(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const [selectedItem, setSelectedItem] = useState(currentPath);
  const handleChangeNaviga = (key) => {
    setSelectedItem(key);
    navigate(key);
  };
  const { user } = useSelector((state) => state);
  const handleGoToLogin = () => {
    navigate("/dang-nhap");
  };

  const items = [
    {
      key: "1",
      label: (
        <span className="span-inline" onClick={() => dispatch(logout())}>
          <PoweroffOutlined style={{ fontSize: 16 }} /> Đăng xuất
        </span>
      ),
    },
  ];
  return (
    <div className="header-container">
      <div className="top-header-container">
        <div className="header-logo-container"></div>
        <div className="header-search-container">
          <Search
            className="common-color search-input"
            placeholder="tìm kiếm sản phẩm..."
            enterButton="Tìm kiếm"
            size="large"
          />
        </div>
        <div className="header-user-container">
          <BellFilled
            className="pointer"
            style={{ fontSize: "30px", color: "white" }}
          />
          <HeartOutlined
            className="pointer"
            style={{ fontSize: "30px", color: "white" }}
          />
          <CartComponent />
          {user && user.isLogin ? (
            <div className="user_action">
              <Dropdown
                overlayClassName="dropdown-container"
                menu={{ items }}
                placement="bottomRight"
                arrow={true}
              >
                <Avatar
                  className="pointer"
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
                />
              </Dropdown>
            </div>
          ) : (
            <span className="white-text pointer" onClick={handleGoToLogin}>
              Đăng nhập
            </span>
          )}
        </div>
      </div>
      <div className="bottom-header-container">
        <Menu
          className="menu-container"
          theme="dark"
          mode="horizontal"
          items={Modules}
          selectedKeys={selectedItem}
          defaultSelectedKeys={Modules[0].key}
          onClick={({ key }) => handleChangeNaviga(key)}
        ></Menu>
      </div>
    </div>
  );
}

export default HeaderCommon;
