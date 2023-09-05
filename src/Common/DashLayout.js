import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import FooterCommon from "./FooterCommon/FooterCommon";
import HeaderCommon from "./HeaderCommon/HeaderCommon";
import "./DashLayout.scss";
const DashLayout = () => {
  return (
    <Layout className="common-layout">
      <div className="header-container pd-2">
        <HeaderCommon />
      </div>
      <div className="dash-container pd-2 mg-2">
        <Outlet />
      </div>
      <FooterCommon />
    </Layout>
  );
};

export default DashLayout;
