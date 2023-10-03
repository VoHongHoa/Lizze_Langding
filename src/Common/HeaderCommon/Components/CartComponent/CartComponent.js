import React, { useState } from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CartItem from "../../../CartItem/CartItem";

import "./CartComponent.scss";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../../Helper/helper";

const CartComponent = () => {
  const { user, cart } = useSelector((state) => state);
  const [cartState, setCartState] = useState(false);
  const navigate = useNavigate();
  const handleShowCart = () => {
    setCartState(true);
  };
  const handleCloseCart = () => {
    setCartState(false);
  };
  const handleGoToCheckoutPage = () => {
    navigate("/thanh-toan");
  };
  const handleGoToDetailCart = () => {
    navigate("/gio-hang");
  };
  return (
    <div
      className="cart-component"
      onMouseOver={handleShowCart}
      onMouseLeave={handleCloseCart}
    >
      <ShoppingOutlined
        className="pointer"
        style={{ fontSize: "30px", color: "white" }}
        onClick={handleGoToDetailCart}
      />
      <div className="tag-cart">
        <span>{cart.totalQuantity}</span>
      </div>
      {cartState && (
        <div className="cart-container">
          {cart.totalQuantity === 0 ? (
            <span
              style={{
                fontSize: "larger",
                textAlign: "center",
                opacity: "0.2",
              }}
            >
              Hiện không có sản phẩm trong giỏ hàng.
            </span>
          ) : (
            <>
              {cart.products.map((item) => {
                return <CartItem data={item} key={item.productCode} />;
              })}
              <div className="cart-footer">
                <div className="card-footer-infor display-flex mgbt-2">
                  <span
                    className="title"
                    style={{ fontSize: "larger", fontWeight: "bolder" }}
                  >
                    Tổng thành tiền:
                  </span>
                  <span
                    className="price"
                    style={{
                      fontSize: "larger",
                      fontWeight: "bolder",
                      color: "red",
                    }}
                  >
                    {formatPrice(cart.total)}
                  </span>
                </div>
                <div className="card-footer-action display-flex">
                  <button
                    className="btn-common pointer"
                    onClick={handleGoToDetailCart}
                  >
                    Xem giỏ hàng
                  </button>
                  <button
                    className="btn-common pointer"
                    onClick={handleGoToCheckoutPage}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartComponent;
