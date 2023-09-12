import { Avatar, Dropdown } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import {
  PoweroffOutlined,
  SolutionOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { logout } from "../../../../redux/userSlice";
const UserComponent = (props) => {
  const { user } = useSelector((state) => state);
  const items = [
    {
      key: "ho-so-ca-nhan",
      label: (
        <span
          className="span-inline"
          onClick={() => props.navigate("/ho-so-ca-nhan")}
        >
          <SolutionOutlined style={{ fontSize: 16 }} /> Hồ sơ cá nhân
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span className="span-inline" onClick={() => props.dispatch(logout())}>
          <ContainerOutlined style={{ fontSize: 16 }} /> Đơn hàng của bạn
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span className="span-inline" onClick={() => props.dispatch(logout())}>
          <PoweroffOutlined style={{ fontSize: 16 }} /> Đăng xuất
        </span>
      ),
    },
  ];
  const handleGoToLogin = () => {
    props.navigate("/dang-nhap");
  };
  const renderComponent = () => {
    if (user && user.isLogin) {
      return (
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
      );
    }

    return (
      <span className="white-text pointer" onClick={handleGoToLogin}>
        Đăng nhập
      </span>
    );
  };

  return renderComponent();
};

export default UserComponent;
