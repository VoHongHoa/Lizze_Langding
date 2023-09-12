import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as ProductsService from "../../../../Service/ProductService";
import "./ResultComponent.scss";
import ProductItem from "../../../../Common/ProductItem/ProductItem";
import { Select } from "antd";
import { TableOutlined, BarsOutlined } from "@ant-design/icons";
const ResultComponent = (props) => {
  const [products, setProducts] = useState([]);
  const [modeView, setModeView] = useState(["grid"]);

  const getAllproducts = useCallback(async () => {
    const res = await ProductsService.getAllProducts();

    if (res && res.status === 200 && res.data.success === true) {
      setProducts(res.data.products);
    }
  }, []);
  const processData = useMemo(() => {
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
    getAllproducts();
  }, []);
  const handleOnchangeSoftCondition = () => {};
  return (
    <>
      <div className="product-filter-result-header">
        <span className="number-result">
          Đã tìm thấy {processData.length} sản phẩm
        </span>
        <div className="action-result">
          <Select
            placeholder="Sắp xếp"
            style={{ width: "200px" }}
            optionFilterProp="children"
            onChange={handleOnchangeSoftCondition}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
          <span> Chế độ xem </span>
          <TableOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <BarsOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
      </div>
      <div className="product-filter-result">
        {processData &&
          processData.length > 0 &&
          processData.map((item) => {
            return (
              <ProductItem
                data={item}
                key={item.productCode}
                openNotification={props.openNotification}
              />
            );
          })}
      </div>
    </>
  );
};

export default ResultComponent;
