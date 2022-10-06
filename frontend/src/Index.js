import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import store from "./store/index";
import "../public/index.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./component/Header.jsx";
import Home from "./pages/home/home.jsx";
import Product from "./pages/products/index.jsx";
import ProductItem from "./pages/products/productItem.jsx";
import Cart from "./pages/cart/index.jsx";
import User from "./pages/user/index.jsx";
import Error from "./pages/Error.jsx";
import { fetchPurchase } from "./actions/cartListAction";
import { fetchUserCollection } from "./actions/userAction";
import { fetchNftTop10 } from "./actions/nftAction";
import { decodeToken } from "react-jwt";

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
   dispatch(fetchNftTop10());
  if (localStorage.getItem("auth")) {
    useEffect(() => {
      window.scroll(0, 0);
    }, [pathname]);

    const total = useSelector((state) => state.productReducer);
    const token = localStorage.getItem("auth");
    const purchaseId = decodeToken(token).purchase;

    useEffect(() => {
      dispatch({ type: "USER_COLLECTION_RESET" });
      dispatch(fetchUserCollection(purchaseId));
    }, [token]);
    useEffect(() => {
      dispatch(fetchPurchase());
    }, [total]);
  }
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/products/item/:id" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/*" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
let container = null;
document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root");
    const root = ReactDOM.createRoot(container);
    root.render(
      //<React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      //</React.StrictMode>
    );
  }
});

if (module.hot) {
  module.hot.accept();
}
