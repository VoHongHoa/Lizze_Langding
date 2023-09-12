import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderCommon.scss";
import { Modules } from ".";
import Search from "antd/es/input/Search";
import { BellFilled, HeartOutlined } from "@ant-design/icons";
import CartComponent from "./Components/CartComponent/CartComponent";
import UserComponent from "./Components/UserComponent/UserComponent";
import { useDispatch } from "react-redux";

function HeaderCommon(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname;
  const [selectedItem, setSelectedItem] = useState(currentPath);
  const handleChangeNaviga = (key) => {
    setSelectedItem(key);
    navigate(key);
  };

  useEffect(() => {
    setSelectedItem(currentPath);
  }, [currentPath]);

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
          <CartComponent navigate={navigate} dispatch={dispatch} />
          <UserComponent dispatch={dispatch} navigate={navigate} />
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
