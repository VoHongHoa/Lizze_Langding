import React, { useEffect, useState } from "react";
import "./SameProduct.scss";
import ProductItem from "../../../Common/ProductItem/ProductItem";
import * as ProductService from "../../../Service/ProductService";

const SameProduct = (props) => {
  const [sameProducts, setSameProducts] = useState([]);

  const getProductByCategories = async (categoriesCode) => {
    try {
      const res = await ProductService.getProductsByCategory(categoriesCode);
      if (res && res.status === 200 && res.data.success === true) {
        const result = res.data.products.filter(
          (item) => item.productCode !== props.productRelate
        );
        if (result.length > 2) {
          setSameProducts(result.slice(0, 2));
        } else {
          setSameProducts(result);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductByCategories(props.categoriesCode);
  }, [props.categoriesCode]);
  return (
    <div className="same-product-container">
      <div className="title">
        <span>Sản phẩm tương tự</span>
      </div>
      <div className="result-container">
        {sameProducts.map((item) => {
          return (
            <ProductItem
              data={item}
              key={item.productCode}
              openNotification={props.openNotification}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SameProduct;
