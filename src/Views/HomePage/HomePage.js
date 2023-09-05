import React, { useCallback, useEffect, useMemo, useState } from "react";
import SliderCommon from "../../Common/SliderCommon/SliderCommon";
import TodayProduct from "./Component/TodayProduct/TodayProduct";
import ProductByCategories from "./Component/ProductByCategories/ProductByCategories";

import * as CategoriesService from "../../Service/CategoriesService";

import { notification } from "antd";
import "./HomePage.scss";

const HomePage = () => {
  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, placement, message) => {
    api[type]({
      message: `Thông báo`,
      description: message,
      placement,
    });
  };
  //state
  const [categories, setCategories] = useState([]);
  //funtion
  const getAllCategories = useCallback(async () => {
    const res = await CategoriesService.getAllCategories();
    if (res && res.status === 200 && res.data.success === true) {
      setCategories(res.data.categories);
    }
  }, []);
  const processCategoriesData = useMemo(() => {
    if (categories.length < 1) {
      return [];
    }
    return categories.map((item) => {
      return {
        key: item._id,
        categoriesName: item.categoriesName,
        categoriesCode: item.categoriesCode,
      };
    });
  }, [categories]);
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="homepage-container">
      {contextHolder}
      <div className="homepage-slider">
        <SliderCommon />
      </div>
      <div className="homepage-slider">
        <TodayProduct openNotification={openNotification} />
      </div>
      {processCategoriesData &&
        processCategoriesData.length > 0 &&
        processCategoriesData.map((categories) => {
          return (
            <div className="homepage-slider">
              <ProductByCategories
                tabTitle={categories.categoriesName}
                categories={categories}
                openNotification={openNotification}
              />
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
