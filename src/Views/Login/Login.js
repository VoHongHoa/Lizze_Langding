import React, { useState } from "react";
import { FacebookOutlined, GoogleCircleFilled } from "@ant-design/icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import * as CustomerService from "../../Service/AuthService";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { loginSuccess } from "../../redux/userSlice";
const Login = () => {
  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const [activeRightPanel, setActiveRightPanel] = useState(true);
  const [data, setData] = useState({
    customerName: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGotoSignUp = () => {
    setData({
      customerName: "",
      password: "",
      email: "",
    });
    setActiveRightPanel(false);
  };
  const handleGotoSignIn = () => {
    setData({
      customerName: "",
      password: "",
      email: "",
    });
    setActiveRightPanel(true);
  };
  const handleSignIn = async () => {
    try {
      if (data.customerName !== "" && data.password !== "") {
        const formData = {
          customerName: data.customerName.toString(),
          password: data.password.toString(),
        };
        const res = await CustomerService.customerSignIn(formData);
        console.log(res);
        if (res && res.status === 200 && res.data.success === true) {
          localStorage.setItem("access_token", res.data.access_token);
          dispatch(loginSuccess(res.data.customer));
          navigate("/");
        } else {
          openNotification("error", "topRight", res.data.message);
        }
      } else {
        openNotification(
          "warning",
          "topRight",
          "Vui lòng nhập đầy đủ thông tin"
        );
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const handleSignup = async () => {
    try {
      if (
        data.customerName !== "" &&
        data.password !== "" &&
        data.email !== ""
      ) {
        const formData = {
          customerName: data.customerName.toString(),
          email: data.email.toString(),
          password: data.password.toString(),
        };
        const res = await CustomerService.customerSignUp(formData);
        console.log(res);
        if (res && res.status === 200 && res.data.success === true) {
          openNotification("success", "topRight", res.data.message);
          setActiveRightPanel(true);
        } else {
          openNotification("error", "topRight", res.data.message);
        }
      } else {
        openNotification(
          "warning",
          "topRight",
          "Vui lòng nhập đầy đủ thông tin"
        );
      }
    } catch (e) {
      console.log(e);
      openNotification("error", "topRight", "Lỗi server");
    }
  };
  const handleOnchangeInput = (keyInput, e) => {
    setData({
      ...data,
      [keyInput]: e.target.value,
    });
  };
  const handleReturnHome = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      {contextHolder}
      <div
        className={
          activeRightPanel ? "container" : "container right-panel-active"
        }
      >
        <div className="form-container sign-up-container">
          <h1>Đăng ký</h1>
          <div className="social-container">
            <FacebookOutlined style={{ fontSize: "40px" }} />
            <GoogleCircleFilled style={{ fontSize: "40px" }} />
          </div>
          <span>Hoặc đăng ký tài khoản với số điện thoại</span>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => handleOnchangeInput("customerName", e)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleOnchangeInput("email", e)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => handleOnchangeInput("password", e)}
          />
          <button className="pointer" onClick={handleSignup}>
            Đăng ký
          </button>
        </div>
        <div className="form-container sign-in-container">
          <h1>Đăng nhập</h1>
          <div className="social-container">
            <FacebookOutlined style={{ fontSize: "40px" }} />
            <GoogleCircleFilled style={{ fontSize: "40px" }} />
          </div>
          <span>Hoặc sử dụng tài khoản của bạn</span>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => handleOnchangeInput("customerName", e)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => handleOnchangeInput("password", e)}
          />
          <a href="#">Quên mật khẩu?</a>
          <button className="pointer" onClick={handleSignIn}>
            Đăng nhập
          </button>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="logo" onClick={handleReturnHome}></div>
              <h1>Lizze xin chào!</h1>
              <p>
                Để duy trì kết nối với chúng tôi vui lòng đăng nhập bằng thông
                tin cá nhân của bạn
              </p>
              <button className="ghost pointer" onClick={handleGotoSignIn}>
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="logo pointer" onClick={handleReturnHome}></div>
              <h1>Lizze xin chào!</h1>
              <p>
                Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng
                tôi
              </p>
              <button className="ghost pointer" onClick={handleGotoSignUp}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
