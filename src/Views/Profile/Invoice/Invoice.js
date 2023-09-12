import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import "./Invoice.scss";
import { getInvoiceByCustomerCode } from "../../../Service/SaleService";
import { useSelector } from "react-redux";
import { Table } from "antd";
import DetailInvoiceModal from "./DetailInvoiceModal/DetailInvoiceModal";

const Invoice = (props) => {
  const { user } = useSelector((state) => state);
  const [showDetail, setShowDetail] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [invoices, setInvoices] = useState([]);
  const fetchInvoicesByCustomerCode = useCallback(async () => {
    const res = await getInvoiceByCustomerCode(user.currentUser.customerCode);
    if (res && res.status === 200 && res.data.success === true) {
      setInvoices(res.data.invoices);
    }
  }, [user.currentUser.customerCode]);

  const processData = useMemo(() => {
    if (invoices.length === 0) {
      return [];
    }
    return invoices.map((item) => {
      return {
        key: item._id,
        invoiceHeaderCode: item.invoiceHeaderCode,
        invoiceShipStatus: item.invoiceShipStatus,
        invoiceShipAddress: item.invoiceShipAddress,
        invoicePaymentStatus: item.invoicePaymentStatus,
        invoiceValue: item.invoiceValue,
        createdAt: item.createdAt,
      };
    });
  }, [invoices]);
  useEffect(() => {
    fetchInvoicesByCustomerCode();
  }, []);

  const handleShowDetail = (invoiceHeaderCode) => {
    setCurrentView(invoiceHeaderCode);
    setShowDetail(true);
  };

  const handleCloseShowDetail = () => {
    setShowDetail(false);
  };

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "invoiceHeaderCode",
      key: "invoiceHeaderCode",
    },
    {
      title: "Trạng thái vận chuyển",
      dataIndex: "invoiceShipStatus",
      key: "invoiceShipStatus",
    },
    {
      title: "Địa chỉ",
      dataIndex: "invoiceShipAddress",
      key: "invoiceShipAddress",
    },
    {
      title: "Trạng thái vận chuyển",
      dataIndex: "invoicePaymentStatus",
      key: "invoicePaymentStatus",
    },
    {
      title: "Trạng thái vận chuyển",
      dataIndex: "invoiceValue",
      key: "invoiceValue",
    },
    {
      title: "Trạng thái vận chuyển",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (item) => {
        return (
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleShowDetail(item.invoiceHeaderCode)}
          />
        );
      },
    },
  ];

  return (
    <div className="customer-invoice-container">
      <h2>Hóa đơn người dùng</h2>
      <Table dataSource={processData} columns={columns} />;
      {showDetail && (
        <DetailInvoiceModal
          open={showDetail}
          invoiceHeaderCode={currentView}
          handleShowDetail={handleShowDetail}
          handleCloseShowDetail={handleCloseShowDetail}
        />
      )}
    </div>
  );
};

export default Invoice;
