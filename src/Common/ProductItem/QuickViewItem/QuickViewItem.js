import React, { useEffect, useState } from "react";
import "./QuickViewItem.scss";
import { Button, Divider, Modal, Rate, Spin } from "antd";
import { getProductByProductCode } from "../../../Service/ProductService";
import defaultImg from "../../../assets/default.jpg";
import * as helper from "../../../Helper/helper";
// import {  } from "@ant-design/icons";
const QuickViewItem = (props) => {
  const [productData, setproductData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const res = await getProductByProductCode(props.productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setproductData(res.data.product);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddtoCart = () => {
    props.handleAddToCart();
    props.handleCloseQuickView();
  };

  useEffect(() => {
    fetchProductData();
  }, [props.productCode]);
  return (
    <Modal
      open={props.isOpen}
      style={{ height: "100vh", overflow: "scroll", top: 10 }}
      title={"Xem nhanh sản phẩm"}
      onCancel={props.handleCloseQuickView}
      key={`modal-${productData?._id}`}
      width={800}
      footer={null}
    >
      <Spin spinning={isLoading}>
        <div className="modal-quick-view">
          <div className="left-container">
            <div className="img-container">
              <img
                src={
                  productData?.productImage[0]
                    ? productData.productImage[0]
                    : defaultImg
                }
              />
            </div>
          </div>
          <div className="right-container">
            <div className="main-infor">
              <h2>{productData?.productName} </h2>

              <div className="product-other-infor">
                <span>
                  Loại sản phẩm: {productData?.CategoriesObject.categoriesName}{" "}
                </span>
                <div className="vertical-divider"></div>

                <Rate
                  disabled
                  allowHalf
                  style={{ fontSize: "14px" }}
                  value={3.5}
                />
                <div className="vertical-divider"></div>
                <span> 2 đánh giá</span>
              </div>
            </div>
            <Divider />
            <p className="price"> {helper.formatPrice(productData?.price)}</p>
            <div className="desc-container">Mô tả của sản phẩm</div>
            <Divider />
            <div className="action">
              <Button
                size="large"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={handleAddtoCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default QuickViewItem;
