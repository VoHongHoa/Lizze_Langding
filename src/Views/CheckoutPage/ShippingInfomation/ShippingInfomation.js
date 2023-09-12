import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import "./ShippingInfomation.scss";
import OrderComponent from "../OrderComponent/OrderComponent";

const ShippingInfomation = (props) => {
  const handleGoToNextStep = (keyStep) => {
    props.handleGoToNextStep(keyStep);
  };
  return (
    <div className="shipping-information-container">
      <div className="title">
        <span>Thông tin hóa đơn</span>
      </div>
      <div className=" shipping-information-main">
        <div className="information">
          <p className="information-tag ">Thông tin liên lạc</p>
          <div className="main-infor">
            <p>
              Số điện thoại:{" "}
              <b>
                {props.invoiceHeader.telephone
                  ? props.invoiceHeader?.telephone
                  : ""}
              </b>
            </p>
            <p>
              Email:{" "}
              <b>
                {props.invoiceHeader.email ? props.invoiceHeader.email : ""}
              </b>
            </p>
            <p>
              Địa chỉ nhận hàng :{" "}
              <b>
                {props.invoiceHeader.address
                  ? props.invoiceHeader?.address
                  : ""}
              </b>
            </p>
          </div>

          <p className="information-tag ">Vận chuyển</p>
          <div className="main-infor">
            <p>
              Vận chuyển trong nước: <b>20000</b>
            </p>
          </div>
          <div className="shipping-information-action">
            <span className="link" onClick={() => handleGoToNextStep(0)}>
              <ArrowLeftOutlined /> Thông tin hóa đơn
            </span>
            <div className="shipping-information-action_btn">
              <button
                className="pointer btn-common"
                onClick={() => handleGoToNextStep(2)}
              >
                Thanh toán online
              </button>
              <button
                className="pointer btn-common"
                onClick={props.handleCreateInvoice}
              >
                Thanh toán khi nhận hàng
              </button>
            </div>
          </div>
        </div>
        <div className="oder-container">
          <p className="information-tag">Đơn hàng của bạn </p>
          <OrderComponent shipping={20} />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfomation;
