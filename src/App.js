import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashLayout from "./Common/DashLayout";
import Login from "./Views/Login/Login";
import HomePage from "./Views/HomePage/HomePage";
import "./App.css";
import IntroPage from "./Views/IntroPage/IntroPage";
import Products from "./Views/Products/Products";
import Promotion from "./Views/Promotion/Promotion";
import News from "./Views/News/News";
import Contact from "./Views/Contact/Contact";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state);
  return (
    <Routes>
      <Route path="/" element={<DashLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/gioi-thieu" element={<IntroPage />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/khuyen-mai" element={<Promotion />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/lien-he" element={<Contact />} />
      </Route>
      <Route
        path="/dang-nhap"
        element={user && user.isLogin ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}

export default App;
