import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./WhiteList.scss";
import * as WhiteListService from "../../../Service/WhiteListService";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import defaultImage from "../../../assets/default.jpg";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
const WhiteList = (props) => {
  const [whiteListProduct, setWhiteListProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllWhiteListProduct = useCallback(async () => {
    try {
      const res = await WhiteListService.getAllWhiteListProduct();
      if (res && res.status === 200 && res.data.success === true) {
        setWhiteListProduct(res.data.whiteListProducts);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleDeleteWhiteList = async (whiteListId) => {
    try {
      const res = await WhiteListService.removeNewWhiteListProduct(whiteListId);
      if (res && res.status === 200 && res.data.success === true) {
        props.openNotification(
          "success",
          "topRight",
          "Xóa sản phẩm yêu thích thành công"
        );

        getAllWhiteListProduct();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const processData = useMemo(() => {
    if (whiteListProduct.length === 0) {
      return [];
    }
    return whiteListProduct.map((item) => {
      return {
        whiteListId: item._id,
        ...item.ProductObject,
      };
    });
  }, [whiteListProduct]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    props.openNotification(
      "success",
      "topRight",
      "Thêm vào giỏ hàng thành công"
    );
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Hình ảnh",
      key: "productImage",
      render: (item) => {
        return (
          <div style={{ width: "50px" }}>
            <img
              style={{ width: "100%" }}
              src={item.productImage[0] ? item.productImage[0] : defaultImage}
            />
          </div>
        );
      },
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày yêu thích",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (item) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <ShoppingCartOutlined
              style={{ cursor: "pointer", fontSize: "25px" }}
              onClick={() => handleAddToCart(item)}
            />
            <EyeOutlined
              style={{ cursor: "pointer", fontSize: "25px" }}
              onClick={() => handleShowDetail(item.productCode)}
            />

            <DeleteOutlined
              style={{ cursor: "pointer", fontSize: "25px", color: "red" }}
              onClick={() => handleDeleteWhiteList(item.whiteListId)}
            />
          </div>
        );
      },
    },
  ];

  const handleShowDetail = (productCode) => {
    navigate(`/san-pham/${productCode}`);
  };

  useEffect(() => {
    getAllWhiteListProduct();
  }, []);
  return (
    <div className="white-list-container">
      <h2>Sản phẩm yêu thích</h2>
      <div className="product-container">
        <Table dataSource={processData} columns={columns} />;
      </div>
    </div>
  );
};

export default WhiteList;
