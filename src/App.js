import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./store/LoginPage";
import RegisterPage from "./store/RegisterPage";
import ProductPage from "./store/ProductPage";
import CartPage from './store/CartPage';





function App() {
  return (
    <Router>
      <Routes>
        {/* path=\"/\" กำหนดให้หน้าแรกเป็น LoginPage */}
        <Route path="/" element={<LoginPage />} />


        {/* path=\"/register\" กำหนดให้หน้า RegisterPage แสดงเมื่อเข้าลิงก์ /register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* เส้นทางหน้า ProductPage */}
        <Route path="/products" element={<ProductPage />} />

        <Route path="/cartpage" element={<CartPage />} />

      </Routes>
    </Router>
  );

  <ProductPage />
}

export default App;
