import React, { useState } from "react";
import "./CheckoutPage.scss";
import { Steps } from "antd";
import CheckoutInformation from "./CheckoutInformation/CheckoutInformation";
import Checkout from "./Checkout/Checkout";
import ShippingInfomation from "./ShippingInfomation/ShippingInfomation";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../Service/SaleService";
import { clearCart } from "../../redux/cartSlice";
const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [invoiceHeader, setInvoiceHeader] = useState({
    email: user.currentUser?.email || "",
    telephone: user.currentUser?.telephone || "",
    boughtName: user.currentUser?.customerName || "",
    receiveName: user.currentUser?.customerName || "",
    address: user.currentUser?.address || "",
    note: "",
  });
  const handleGoToNextStep = (keyStep) => {
    setCurrentStep(keyStep);
  };
  const handleOnchangeInput = (value, keyInput) => {
    setInvoiceHeader({
      ...invoiceHeader,
      [keyInput]: value,
    });
  };
  const handleCreateInvoice = async () => {
    try {
      const data = {
        products: cart.products,
        invoiceHeader: {
          invoiceValue: cart.total,
          invoiceEmail: invoiceHeader.email,
          invoicePaymentStatus: "Chưa hoàn thành",
          invoiceShipStatus: "Chưa giao hàng",
          invoiceShipAddress: invoiceHeader.address,
          invoiceReceivedPhone: invoiceHeader.telephone,
          invoiceBoughtName: invoiceHeader.boughtName,
          invoiceReceiveName: invoiceHeader.receiveName,
          invoiceQuantity: cart.totalQuantity,
          invoiceNote: invoiceHeader.note,
          promotionCode: cart.promotion,
        },
      };
      const res = await createInvoice(data);
      if (res && res.status === 200 && res.data.success === true) {
        dispatch(clearCart());
        handleGoToNextStep(2);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const renderChildrenStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <CheckoutInformation
            handleOnchangeInput={handleOnchangeInput}
            handleGoToNextStep={handleGoToNextStep}
            invoiceHeader={invoiceHeader}
          />
        );
      case 1:
        return (
          <ShippingInfomation
            handleOnchangeInput={handleOnchangeInput}
            handleGoToNextStep={handleGoToNextStep}
            invoiceHeader={invoiceHeader}
            handleCreateInvoice={handleCreateInvoice}
          />
        );
      // case 2:
      //   return <Checkout />;

      default:
        break;
    }
  };
  return (
    <div className="checkout-main-page-container">
      <div className="checkout-step">
        <Steps
          current={currentStep}
          items={[
            {
              title: "Thông tin hóa đơn",
            },
            {
              title: "Thông tin vận chuyển",
            },
            {
              title: "Hoàn thành",
            },
          ]}
        />
      </div>
      <div className="checkout-content">{renderChildrenStepContent()}</div>
    </div>
  );
};

export default CheckoutPage;
