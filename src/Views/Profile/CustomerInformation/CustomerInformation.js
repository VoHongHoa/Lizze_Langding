import React from "react";
import "./CustomerInformation.scss";

const CustomerInformation = (props) => {
  const handleOnchangeInput = (e, keyInput) => {
    props.handleOnchangeInfor(e.target.value, keyInput);
  };
  return (
    <div className="customer-information">
      <h2>Thông tin người dùng</h2>
      <div className="information-form ">
        <span>Mã người dùng</span>
        <input disabled value={props.customerInfor?.customerCode || ""} />
        <span>Tên người dùng</span>
        <input
          type="text"
          value={props.customerInfor?.customerName || ""}
          onChange={(e) => handleOnchangeInput(e, "customerName")}
        />
        <span>Tên hiển thị</span>
        <input
          value={props.customerInfor?.displayName || ""}
          onChange={(e) => handleOnchangeInput(e, "displayName")}
        />
        <span>Email</span>
        <input
          value={props.customerInfor?.email || ""}
          onChange={(e) => handleOnchangeInput(e, "email")}
        />
        <span>Số điện thoại</span>
        <input
          value={props.customerInfor?.telephone || ""}
          onChange={(e) => handleOnchangeInput(e, "telephone")}
        />
        <span>Địa chỉ</span>
        <input
          value={props.customerInfor?.address || ""}
          onChange={(e) => handleOnchangeInput(e, "address")}
        />
      </div>
      <div>
        <button
          className="btn-common pointer"
          style={{ float: "right", marginTop: "10px" }}
          onClick={props.handleUpdateCustomerInfor}
        >
          Thay đổi
        </button>
      </div>
    </div>
  );
};

export default CustomerInformation;
