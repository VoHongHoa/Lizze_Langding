import { Modal, Button, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { getDetailInvoice } from "../../../../Service/SaleService";
import imageDefault from "../../../../assets/default.jpg";
import "./DetailInvoiceModal.scss";

const DetailInvoiceModal = (props) => {
  const [detailInvoice, setDetailInvoice] = useState("");
  const [invoiceHeader, setInvoiceheader] = useState("");

  const fetchDetailInvoice = async () => {
    const res = await getDetailInvoice(props.invoiceHeaderCode);
    console.log("check ré", res);
    if (res && res.status && res.data.success === true) {
      setInvoiceheader(res.data.result?.invoiceHeader || "");
      setDetailInvoice(res.data.result?.detailInvoice || []);
    }
  };

  const processDatatable = useMemo(() => {
    if (detailInvoice.length === 0) {
      return;
    }
    return detailInvoice.map((item) => {
      return {
        key: item._id,
        productCode: item.productCode,
        quantity: item.quantity,
        productName: item.ProductObject?.productName || "",
        price: item.ProductObject?.price || "",
        image: item.ProductObject.productImage[0]
          ? item.ProductObject.productImage[0]
          : imageDefault,
      };
    });
  }, [detailInvoice]);

  useEffect(() => {
    fetchDetailInvoice();
  }, [props.invoiceHeaderCode]);

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (item) => {
        return (
          <div style={{ width: "50px" }}>
            <img style={{ width: "100%" }} src={item.image} />
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={props.open}
      style={{ height: "100vh", overflow: "scroll", top: 10 }}
      title={`Hóa đơn mua hàng ${props.invoiceHeaderCode}`}
      onCancel={props.handleCloseShowDetail}
      footer={[
        <Button
          size="large"
          style={{ backgroundColor: "green", color: "white" }}
          key="back"
          onClick={props.handleCloseShowDetail}
        >
          Trở về
        </Button>,
      ]}
    >
      <div className="modal-detail-invoice">
        <div className="invoice-header">
          <p>
            Mã hóa đơn: <b> {invoiceHeader.invoiceHeaderCode}</b>
          </p>
          <p>
            Ngày hóa đơn: <b> {invoiceHeader.createdAt}</b>
          </p>
          <p>
            Số điện thoại: <b> {invoiceHeader.invoiceReceivedPhone}</b>
          </p>
          <p>
            Email: <b> {invoiceHeader.invoiceEmail}</b>
          </p>
          <p>
            Địa chỉ nhận hàng: <b> {invoiceHeader.invoiceShipAddress}</b>
          </p>
          <p>
            Trạng thái vận chuyển: <b> {invoiceHeader.invoiceShipStatus}</b>
          </p>
          <p>
            Trạng thái hóa đơn: <b> {invoiceHeader.invoicePaymentStatus}</b>
          </p>
          <p>
            Trị giá hóa đơn: <b> {invoiceHeader.invoiceValue}</b>
          </p>
        </div>
        <div className="invoice-detail">
          <Table dataSource={processDatatable} columns={columns} />;
        </div>
      </div>
    </Modal>
  );
};

export default DetailInvoiceModal;
