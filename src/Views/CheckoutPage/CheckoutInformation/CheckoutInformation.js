import React from "react";
import OrderComponent from "../OrderComponent/OrderComponent";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import "./CheckoutInformation.scss";
import { useNavigate } from "react-router-dom";

const CheckoutInformation = (props) => {
  const navigate = useNavigate();
  const handleGoToCart = () => {
    navigate("/gio-hang");
  };
  const handleGoToNextStep = (keyStep) => {
    props.handleGoToNextStep(keyStep);
  };
  const handleOnchange = (e, keyInput) => {
    props.handleOnchangeInput(e.target.value, keyInput);
  };
  return (
    <div className="checkout-information-container">
      <div className="title">
        <span>Thông tin hóa đơn</span>
      </div>
      <div className=" checkout-information-main">
        <div className="information">
          <p className="information-tag ">Thông tin liên lạc</p>
          <div className="information-name">
            <div className="w-50">
              <span>Email</span>
              <input
                className="w-100 "
                onChange={(e) => handleOnchange(e, "email")}
                value={
                  props.invoiceHeader.email ? props.invoiceHeader.email : ""
                }
                placeholder="Nhập email"
              />
            </div>

            <div className="w-50">
              <span>Số điện thoại</span>
              <input
                className="w-100 "
                onChange={(e) => handleOnchange(e, "telephone")}
                value={
                  props.invoiceHeader.telephone
                    ? props.invoiceHeader.telephone
                    : ""
                }
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <p className="information-tag ">Thông tin vận chuyển</p>
          <div className="information-name">
            <div className="w-50">
              <span>Tên người mua</span>
              <input
                className="w-100 "
                onChange={(e) => handleOnchange(e, "boughtName")}
                value={
                  props.invoiceHeader.boughtName
                    ? props.invoiceHeader.boughtName
                    : ""
                }
                placeholder="Họ và tên người mua"
              />
            </div>
            <div className="w-50">
              <span>Tên người nhận</span>
              <input
                className="w-100"
                onChange={(e) => handleOnchange(e, "receiveName")}
                value={
                  props.invoiceHeader.receiveName
                    ? props.invoiceHeader.receiveName
                    : ""
                }
                placeholder="Họ và tên người nhận"
              />
            </div>
          </div>
          <span>Địa chỉ</span>
          <input
            className="w-100 "
            onChange={(e) => handleOnchange(e, "address")}
            value={
              props.invoiceHeader.address ? props.invoiceHeader.address : ""
            }
            placeholder="Địa chỉ nhận hàng"
          />
          <span>Ghi chú</span>
          <input
            className="w-100 "
            onChange={(e) => handleOnchange(e, "note")}
            value={props.invoiceHeader.note ? props.invoiceHeader.note : ""}
            placeholder="Ghi chú"
          />

          <div className="checkout-information-action">
            <span className="link" onClick={handleGoToCart}>
              <ArrowLeftOutlined /> Trở về giỏ hàng
            </span>
            <button
              className="pointer btn-common"
              onClick={() => handleGoToNextStep(1)}
            >
              Thông tin vận chuyển <ArrowRightOutlined />
            </button>
          </div>
        </div>
        <div className="oder-container">
          <p className="information-tag">Đơn hàng của bạn </p>
          <OrderComponent />
        </div>
      </div>
    </div>
  );
};

export default CheckoutInformation;
