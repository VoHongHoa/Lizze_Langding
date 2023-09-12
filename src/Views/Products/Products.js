import React from "react";
import FilterComponent from "./Components/FilterComponent/FilterComponent";
import ResultComponent from "./Components/ResultComponent/ResultComponent";
import { notification } from "antd";

import "./Products.scss";
const Products = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  return (
    <div className="product-page-container">
      {contextHolder}
      <FilterComponent />
      <div className="product-result">
        <ResultComponent openNotification={openNotification} />
      </div>
    </div>
  );
};

export default Products;
