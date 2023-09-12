import React, { useEffect, useState } from "react";
import {
  getCustomerInfor,
  updateCustomerInfor,
} from "../../Service/CustomerService";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Spin, notification } from "antd";
import { logout } from "../../redux/userSlice";
import "./Profile.scss";
import CustomerInformation from "./CustomerInformation/CustomerInformation";
import Invoice from "./Invoice/Invoice";

const Profile = () => {
  const [customerInfor, setCustomerInfor] = useState({});
  const [keyChildren, setKeyChildren] = useState("1");

  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const handleOnchangeInfor = (value, keyInput) => {
    setCustomerInfor({
      ...customerInfor,
      [keyInput]: value,
    });
  };

  const handleUpdateCustomerInfor = async () => {
    setIsLoading(true);
    const res = await updateCustomerInfor(
      customerInfor.customerCode,
      customerInfor
    );
    if (res && res.status === 200 && res.data.success === true) {
      openNotification("success", "topRight", "Thay đổi thông tin thành công");
      fetchCustomerInfor();
    }
  };

  const fetchCustomerInfor = async () => {
    setIsLoading(true);
    const res = await getCustomerInfor(user.currentUser.customerCode);
    if (res && res.status === 200 && res.data.success === true) {
      setCustomerInfor(res.data.customer);
    }
    setIsLoading(false);
  };
  const renderChildren = () => {
    switch (keyChildren) {
      case "1":
        return (
          <CustomerInformation
            customerInfor={customerInfor}
            handleOnchangeInfor={handleOnchangeInfor}
            handleUpdateCustomerInfor={handleUpdateCustomerInfor}
          />
        );
      case "2":
        return (
          <CustomerInformation
            customerInfor={customerInfor}
            handleOnchangeInfor={handleOnchangeInfor}
            handleUpdateCustomerInfor={handleUpdateCustomerInfor}
          />
        );
      case "3":
        return (
          <Invoice
            customerInfor={customerInfor}
            handleOnchangeInfor={handleOnchangeInfor}
            handleUpdateCustomerInfor={handleUpdateCustomerInfor}
          />
        );
      case "4":
        return (
          <CustomerInformation
            customerInfor={customerInfor}
            handleOnchangeInfor={handleOnchangeInfor}
            handleUpdateCustomerInfor={handleUpdateCustomerInfor}
          />
        );
      case "5":
        return (
          <CustomerInformation
            customerInfor={customerInfor}
            handleOnchangeInfor={handleOnchangeInfor}
            handleUpdateCustomerInfor={handleUpdateCustomerInfor}
          />
        );

      default:
        break;
    }
  };
  useEffect(() => {
    fetchCustomerInfor();
  }, []);
  const handleChangeMenu = (item) => {
    setKeyChildren(item.key);
  };
  const profileMenuItem = [
    {
      key: "1",
      label: "Thông tin tài khoản",
      // icon: <BellOutlined />
    },
    {
      key: "2",
      label: "Thông báo",
    },
    {
      key: "3",
      label: "Đơn hàng",
    },
    {
      key: "4",
      label: "Sản phẩm vừa xem",
    },
    {
      key: "5",
      label: "Sản phẩm yêu thích",
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div className="profile-container">
        {contextHolder}
        <div className="left-container">
          <div className="main-infor">
            <Avatar
              size={"large"}
              className="pointer"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
            />
            <div className="name-email">
              <p>
                {customerInfor?.displayName
                  ? customerInfor.displayName
                  : "Không có tên"}
              </p>
              <p>
                <b>
                  {customerInfor?.email
                    ? customerInfor.email
                    : "Không có email"}
                </b>
              </p>
            </div>
          </div>
          <div className="profile-menu">
            <ul className="menu-list">
              {profileMenuItem &&
                profileMenuItem.map((item) => {
                  return (
                    <li
                      className={keyChildren === item.key ? "active" : ""}
                      key={item.key}
                      onClick={() => handleChangeMenu(item)}
                    >
                      {item.label}
                    </li>
                  );
                })}
              <li onClick={() => dispatch(logout())}>Đăng xuất</li>
            </ul>
          </div>
        </div>
        <div className="right-container">{renderChildren()}</div>
      </div>
    </Spin>
  );
};

export default Profile;
