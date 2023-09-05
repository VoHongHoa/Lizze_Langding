import React from "react";
import defaultImage from "../../assets/default.jpg";
import { DeleteOutlined } from "@ant-design/icons";
import {
  removeFromcart,
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
import "./CartItem.scss";
import { useDispatch } from "react-redux";
const CartItem = (props) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = () => {
    dispatch(removeFromcart(props.data));
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(props.data));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(props.data));
  };

  const handleOnchangeQuantity = (e) => {
    props.data.quantity = e.target.value;
    dispatch(changeQuantity(props.data));
  };
  return (
    <div className="cart-item-container">
      <div className="cart-item-img">
        <img
          src={
            props.data.productImage[0]
              ? props.data.productImage[0]
              : defaultImage
          }
        />
      </div>
      <div className="cart-item-infor">
        <div className="cart-item-infor-main">
          <span className="tag-name">{props.data.productName}</span>
          <span className="tag-price">{props.data.price}</span>
        </div>
        <div className="cart-item-infor-action">
          <div className="cart-item-infor-action-quantity">
            <button
              className="btn-action pointer"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <input
              type="text"
              // onChange={(e) => handleOnchangeQuantity(e)}
              value={!!props.data.quantity ? props.data.quantity : ""}
              disabled
            />

            <button
              className="btn-action pointer"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="cart-item-infor-action-delete pointer">
        <DeleteOutlined
          style={{ fontSize: "20px" }}
          onClick={handleRemoveProduct}
        />
      </div>
    </div>
  );
};

export default CartItem;
