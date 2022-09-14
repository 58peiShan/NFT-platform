import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/index";
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
  
  const id = localStorage.getItem("id");
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/*" element={<User id={id} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  //</React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
