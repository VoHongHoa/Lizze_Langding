import React from "react";

import "./OrderComponent.scss";
import { useSelector } from "react-redux";
import { Divider } from "antd";

const OrderComponent = (props) => {
  const { cart } = useSelector((state) => state);
  return (
    <div className="order-component-container">
      <div className="order-header">
        <span className="information-tag">Danh sách sản phẩm </span>
        <span className="information-tag">Giá</span>
      </div>
      <Divider />
      <div className="order-products">
        {cart &&
          cart.products?.length > 0 &&
          cart.products.map((item) => {
            return (
              <div className="order-header mgb-1" key={item.productCode}>
                <span style={{ fontWeight: "bold", color: "grey" }}>
                  {item.productName} x {item.quantity}
                </span>
                <span>{item.price}</span>
              </div>
            );
          })}
      </div>
      <Divider />
      <div className="order-total-product order-header">
        <span style={{ fontWeight: "bold" }}>Thành tiền sản phẩm: </span>
        <span>{cart.total}</span>
      </div>
      <Divider />
      {props.shipping && (
        <>
          <div className="order-shipping-fee order-header">
            <span>Phí vận chuyển: </span>
            <span>{props.shipping ? props.shipping : "0"}</span>
          </div>
          <Divider />
        </>
      )}

      <div className="order-total order-header">
        <span style={{ fontWeight: "bold" }}>Tổng thành tiền: </span>
        <span style={{ fontWeight: "bold" }}>{cart.total}</span>
      </div>
    </div>
  );
};

export default OrderComponent;
