import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const content = isLogin === false ? children : <Navigate to={"/"} />;
  return content;
};

export default PublicRoute;
