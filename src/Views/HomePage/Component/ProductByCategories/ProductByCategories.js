import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as ProductService from "../../../../Service/ProductService";
import ProductItem from "../../../../Common/ProductItem/ProductItem";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";

import "./ProductByCategories.scss";
import ProductTabPanel from "../../../../Common/ProductTabPanel/ProductTabPanel";
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="pointer" onClick={onClick}>
      <RightOutlined
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          background: "green",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          top: "50%",
          right: "-40px",
          fontSize: "15px",
          color: "white",
        }}
      />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="pointer" onClick={onClick}>
      <LeftOutlined
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          background: "green",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          top: "50%",
          left: "-40px",
          fontSize: "15px",
          color: "white",
          zIndex: 1000,
        }}
      />
    </div>
  );
}
const ProductByCategories = (props) => {
  const [products, setProducts] = useState([]);
  const getProductsByCategories = useCallback(async () => {
    const res = await ProductService.getProductsByCategory(
      props.categories.categoriesCode
    );
    if (res && res.status === 200 && res.data.success === true) {
      setProducts(res.data.products);
    }
  }, []);

  const processProductData = useMemo(() => {
    if (products.length < 1) {
      return [];
    }
    return products.map((item) => {
      return {
        key: item._id,
        productName: item.productName,
        productCode: item.productCode,
        price: item.price,
        category: item.CategoriesObject?.categoriesName,
        productImage: item.productImage,
        color: item.color,
        description: item.description,
        size: item.size,
      };
    });
  }, [products]);
  useEffect(() => {
    getProductsByCategories();
  }, []);
  const settings = {
    className: "center",
    // centerMode: true,
    infinite: true,
    slidesToShow: processProductData.length > 3 ? 6 : processProductData.length,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="today-product">
      <ProductTabPanel tabTitle={props.tabTitle}>
        <Slider {...settings}>
          {processProductData &&
            processProductData.length > 0 &&
            processProductData.map((item) => {
              return (
                <ProductItem
                  data={item}
                  key={item.productCode}
                  openNotification={props.openNotification}
                />
              );
            })}
        </Slider>
      </ProductTabPanel>
    </div>
  );
};

export default ProductByCategories;
