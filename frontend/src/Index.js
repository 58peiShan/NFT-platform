import React, { useEffect } from "react";
import "../public/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./component/Header.jsx";
import Home from "./pages/home/home.jsx";
import Product from "./pages/products/index.jsx";
import Cart from "./pages/cart/index.jsx";
import User from "./pages/user/index.jsx";
import Error from "./pages/Error.jsx";

const App = () => {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
