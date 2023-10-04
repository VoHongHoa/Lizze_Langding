import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import * as ProductService from "../../Service/ProductService";
import { Divider, Rate, Spin, Tabs, notification } from "antd";
import defaultImage from "../../assets/default.jpg";
import {
  ContainerOutlined,
  CarOutlined,
  CreditCardOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../Helper/helper";
import SameProduct from "./SameProduct/SameProduct";
import ReviewTab from "./ReviewTab/ReviewTab";
import OtherReview from "./OtherReview/OtherReview";

const ProductDetail = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  const { productCode } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const getproductDetail = async (productCode) => {
    setIsLoading(true);
    try {
      const res = await ProductService.getProductByProductCode(productCode);
      if (res && res.status === 200 && res.data.success === true) {
        setProductDetail(res.data.product);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProductReview = async (productCode) => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (key) => {
    // console.log(key);
    setActiveKey(key);
  };
  const items = [
    {
      key: "1",
      label: "Mô tả sản phẩm",
      children: (
        <div
          className="product-desc"
          dangerouslySetInnerHTML={{
            __html: productDetail.description
              ? productDetail.description
              : "Sản phẩm không có mô tả chi tiết",
          }}
        ></div>
      ),
    },
    {
      key: "2",
      label: "Thông số sản phẩm",
      children: "Thông số của sản phẩm",
    },
    {
      key: "3",
      label: "Đánh giá và bình luận",
      children: (
        <ReviewTab
          productCode={productCode}
          openNotification={openNotification}
        />
      ),
    },

    {
      key: "4",
      label: "Xem các đánh giá khác",
      children: (
        <OtherReview
          productCode={productCode}
          openNotification={openNotification}
        />
      ),
    },
  ];

  useEffect(() => {
    getproductDetail(productCode);
  }, [productCode]);

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <div className="product-detail-container">
        <div className="top-container">
          <div className="left-container">
            <div className="top-main-info-container">
              <div className="img-container">
                <img
                  src={
                    productDetail.productImage && productDetail.productImage[0]
                      ? productDetail.productImage[0]
                      : defaultImage
                  }
                />
              </div>
              <div className="main-infor">
                <h2>{productDetail?.productName} </h2>
                <div className="product-other-infor">
                  <span>
                    Loại sản phẩm:{" "}
                    {productDetail?.CategoriesObject?.categoriesName}
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

                <Divider />
                <p className="price"> {formatPrice(productDetail?.price)}</p>
                <div className="desc-container">Thông số của sản phẩm</div>
                <Divider />
              </div>
            </div>

            <div className="bot-main-info-conatiner">
              <Tabs
                activeKey={activeKey}
                items={items}
                onChange={onChange}
                size="large"
              />
            </div>
          </div>

          <div className="right-container">
            <div className="policy-container">
              <span>
                <CarOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Vận chuyển toàn quốc
              </span>
              <span>
                <RedoOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Chính sách đổi trả trong vòng 7 ngày
              </span>
              <span>
                <ContainerOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Cung cấp hóa đơn khi cần thiết
              </span>
              <span>
                <CreditCardOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Thanh toán online hoặc khi nhận được hàng
              </span>
            </div>

            <SameProduct
              categoriesCode={productDetail.CategoriesObject?.categoriesCode}
              productRelate={
                !!productDetail.productCode ? productDetail.productCode : ""
              }
              openNotification={openNotification}
            />
          </div>
        </div>

        <div className="bottom-container"></div>
      </div>
    </Spin>
  );
};

export default ProductDetail;
