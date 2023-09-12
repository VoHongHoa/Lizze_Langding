import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./FilterComponent.scss";
import * as CategoriesService from "../../../../Service/CategoriesService";
import * as ColorService from "../../../../Service/ColorService";
import * as SizeService from "../../../../Service/SizeService";
import { Checkbox, Collapse, Slider } from "antd";

const FilterComponent = () => {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [rangePrice, setRangePrice] = useState({
    minPrice: 0,
    maxPrice: 4000000,
  });
  //funtion
  const getAllCategories = useCallback(async () => {
    const res = await CategoriesService.getAllCategories();
    if (res && res.status === 200 && res.data.success === true) {
      setCategories(res.data.categories);
    }
  }, []);
  const getAllColors = useCallback(async () => {
    const res = await ColorService.getAllColors();
    if (res && res.status === 200 && res.data.success === true) {
      setColors(res.data.colors);
    }
  }, []);
  const getAllSizes = useCallback(async () => {
    const res = await SizeService.getAllSizes();
    if (res && res.status === 200 && res.data.success === true) {
      setSizes(res.data.sizes);
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
    getAllColors();
    getAllSizes();
  }, []);

  const categoriesChildrenTab = processCategoriesData.map((item) => {
    return { label: item.categoriesName, value: item.categoriesCode };
  });
  const colorsChildrenTab = colors.map((item) => {
    return { label: item.colorName, value: item.colorCode };
  });
  const sizesChildrenTab = sizes.map((item) => {
    return { label: item.sizeName, value: item.sizeCode };
  });

  const handleonChangeCategoriesCheckbox = () => {};
  const handleOnchangeRangePrice = (value) => {
    setRangePrice({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };
  return (
    <div className="filter-container">
      <div className="fliter-categories">
        <Collapse
          items={[
            {
              key: "1",
              label: "Loại sản phẩm",
              children: (
                <Checkbox.Group
                  options={categoriesChildrenTab}
                  onChange={handleonChangeCategoriesCheckbox}
                />
              ),
            },
            {
              key: "2",
              label: "Màu sắc",
              children: (
                <Checkbox.Group
                  options={colorsChildrenTab}
                  onChange={handleonChangeCategoriesCheckbox}
                />
              ),
            },
            {
              key: "3",
              label: "Kích thước",
              children: (
                <Checkbox.Group
                  options={sizesChildrenTab}
                  onChange={handleonChangeCategoriesCheckbox}
                />
              ),
            },
            {
              key: "4",
              label: "Giá",
              children: (
                <div>
                  <Slider
                    range
                    defaultValue={[0, 4000000]}
                    max={4000000}
                    min={0}
                    step={100000}
                    onAfterChange={handleOnchangeRangePrice}
                  />
                  <span>
                    Khoảng giá: {rangePrice.minPrice} - {rangePrice.maxPrice}{" "}
                  </span>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1", "2", "3", "4"]}
        />
      </div>
      <div className="fliter-color"></div>
      <div className="fliter-price"></div>
    </div>
  );
};

export default FilterComponent;
