import { Tabs } from "antd";
import React, { useState } from "react";
import "./ProductTabPanel.scss";
const ProductTabPanel = (props) => {
  const [activeTab, setActiveTab] = useState("New-Products");
  const items = [
    {
      label: "Hàng mới về",
      key: "New-Products",
    },
    {
      label: "Hàng bán chạy",
      key: "Best-Seller-Products",
    },
    {
      label: "Hàng phổ biến",
      key: "Popular-Products",
    },
  ];
  const handleChangeTab = (item) => {
    console.log(item);
    setActiveTab(item.key);
  };
  return (
    <div className="product-tab-container">
      <div className="product-tab-nav">
        <div className="product-tab-nav-title">{props.tabTitle}</div>
        <div className="product-tab-nav-option">
          {items &&
            items.map((item) => {
              return (
                <span
                  key={item.key}
                  className={
                    activeTab === item.key
                      ? "pointer product-tab-nav-option-title active"
                      : "pointer product-tab-nav-option-title"
                  }
                  onClick={() => handleChangeTab(item)}
                >
                  {item.label}
                </span>
              );
            })}
          <span className="product-tab-nav-view-all pointer product-tab-nav-option-title">
            Xem tất cả
          </span>
        </div>
      </div>
      <div className="product-tab-main">{props.children}</div>
    </div>
  );
};

export default ProductTabPanel;
