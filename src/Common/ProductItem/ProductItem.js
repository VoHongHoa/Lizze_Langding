import React, { useState } from "react";
import defaultImage from "../../assets/default.jpg";
import "./ProductItem.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import {
  ShoppingOutlined,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import QuickViewItem from "./QuickViewItem/QuickViewItem";
import { useNavigate } from "react-router-dom";
import * as helper from "../../Helper/helper";
import { addNewWhiteListProduct } from "../../Service/WhiteListService";
const ProductItem = (props) => {
  const dispatch = useDispatch();

  const [openQuickView, setOpenQuickView] = useState(false);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    props.openNotification("success", "topRight", "Thêm vào giỏ thành công");
    dispatch(addToCart(props.data));
  };

  const handleOpenQuickView = () => {
    setOpenQuickView(true);
  };

  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };

  const handleAddToWhiteList = async () => {
    try {
      const data = {
        productCode: props.data.productCode,
      };
      const res = await addNewWhiteListProduct(data);
      if (res && res.status === 200 && res.data.success === true) {
        props.openNotification(
          "success",
          "topRight",
          "Thêm sản phẩm yêu thích thành công"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewDetailProduct = () => {
    navigate(`/san-pham/${props.data.productCode}`);
  };

  return (
    <div className="card pointer">
      <img
        src={
          props.data.productImage[0] ? props.data.productImage[0] : defaultImage
        }
        alt="Denim Jeans"
        onClick={handleViewDetailProduct}
      />
      <h4 onClick={handleViewDetailProduct}>{props.data.productName}</h4>
      <p className="price">{helper.formatPrice(props.data.price)}</p>
      <div className="cart-action">
        <span>
          <ShoppingOutlined onClick={handleAddToCart} />
        </span>
        <span>
          <HeartOutlined onClick={handleAddToWhiteList} />
        </span>
        <span>
          <EyeOutlined onClick={handleOpenQuickView} />
        </span>
      </div>
      {openQuickView === true && (
        <QuickViewItem
          isOpen={openQuickView}
          handleCloseQuickView={handleCloseQuickView}
          productCode={props.data.productCode}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductItem;
