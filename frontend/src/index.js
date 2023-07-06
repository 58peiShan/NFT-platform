import React, { Suspense, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import store from "./store/index";
import "./scss/_global.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
const Header = React.lazy(()=>import("./component/Header.jsx"))
const Home = React.lazy(()=>import("./pages/home/home.jsx"))
const Product = React.lazy(()=>import("./pages/products/index.jsx"))
const ProductItem = React.lazy(()=>import("./pages/products/productItem.jsx"))
const Cart = React.lazy(()=>import("./pages/cart/index.jsx"))
const User = React.lazy(()=>import("./pages/user/index.jsx"))
const Error = React.lazy(()=>import("./pages/Error.jsx"))
import { fetchPurchase } from "./actions/cartListAction";
import { fetchUserCollection } from "./actions/userAction";
import { fetchNftTop10 } from "./actions/nftAction";
import { decodeToken } from "react-jwt";

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.productReducer);
  dispatch(fetchNftTop10());

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const token = localStorage.getItem("auth");
      const purchaseId = decodeToken(token).purchase;
      dispatch({ type: "USER_COLLECTION_RESET" });
      dispatch(fetchUserCollection(purchaseId));
    }
  }, [localStorage,localStorage.getItem("auth")]);
  useEffect(() => {
    dispatch(fetchPurchase());
  }, [total]);
  return (
    <>
      <Header />
      <Suspense fallback={<>loading...</>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/*" element={<Product />} />
            <Route path="/products/item/:id" element={<ProductItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/*" element={<User />} />
            <Route path="*" element={<Error />} />
          </Routes>
          </Suspense>
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
