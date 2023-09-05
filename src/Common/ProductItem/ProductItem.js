import React from "react";
import defaultImage from "../../assets/default.jpg";
import "./ProductItem.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import {
  ShoppingOutlined,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    props.openNotification("success", "topRight", "Thêm vào giỏ thành công");
    dispatch(addToCart(props.data));
  };
  return (
    <div className="card pointer">
      <img
        src={
          props.data.productImage[0] ? props.data.productImage[0] : defaultImage
        }
        alt="Denim Jeans"
      />
      <h4>{props.data.productName}</h4>
      <p className="price">{props.data.price} VND</p>
      <div className="cart-action">
        <span>
          <ShoppingOutlined onClick={handleAddToCart} />
        </span>
        <span>
          <HeartOutlined />
        </span>
        <span>
          <EyeOutlined />
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
