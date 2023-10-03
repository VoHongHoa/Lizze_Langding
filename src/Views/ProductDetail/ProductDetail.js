import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import * as ProductService from "../../Service/ProductService";
import { Divider, Rate, Spin, Tabs } from "antd";
import defaultImage from "../../assets/default.jpg";
import {
  ContainerOutlined,
  CarOutlined,
  CreditCardOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../Helper/helper";

const ProductDetail = () => {
  const { productCode } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getproductDetail(productCode);
  }, [productCode]);

  return (
    <Spin spinning={isLoading}>
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
                <div className="desc-container">Mô tả của sản phẩm</div>
                <Divider />
              </div>
            </div>

            <div className="bot-main-info-conatiner">
              <Tabs />
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
          </div>
        </div>

        <div className="bottom-container"></div>
      </div>
    </Spin>
  );
};

export default ProductDetail;
