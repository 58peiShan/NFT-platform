import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ScaleLoader from "react-spinners/ClipLoader";

const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(49, 150, 218)",
};

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  const purchaseList = JSON.parse(localStorage.getItem("purchase"));
  const list = useSelector((state) => state.cartlist.purchase) || [];
  const total = useSelector((state) => state.productReducer);

  const handlePay = () => {};
  const handleDel = (id) => {
    dispatch({ type: "PURCHASE_RESET" });
    dispatch({ type: "DECREASE" });
    const i = purchaseList.findIndex((element) => element == id);
    if (i === 0) {
      let remove = purchaseList.splice(0, 1);
    } else {
      let remove = purchaseList.splice(i, i);
    }
    localStorage.setItem("purchase", "[" + purchaseList + "]");
  };
  const eachPrice = [];
  list.every((o) => eachPrice.push(o.price));
  const initialValue = 0;
  const totalPrice = eachPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );


  const outputList = list.map((v, i) => {
    return (
      <tr key={i}>
        <td>
          <img src={`/img/${v.img}`} alt="" />
        </td>
        <td>{v.workName}</td>
        <td>{v.price}</td>
        <td>{v.amount}</td>
        <td>{v.price * v.amount}</td>
        <td
          onClick={(e) => {
            handleDel(v.id);
          }}
        >
          <FaTrash />
        </td>
      </tr>
    );
  });

  return auth ? (
    <>
      <div className="divcontainer">
        <table>
          <thead>
            <tr>
              <th>商品圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            {total < 1 ? (
              <tr>
                <td colSpan={6}>nodata</td>
              </tr>
            ) : (
              outputList
            )}
          </tbody>
        </table>
        <hr />
        <div className="d-flex total">
          total：{totalPrice}
          <button onClick={handlePay}>付款</button>
        </div>
      </div>
    </>
  ) : (
    <div className="divcontainer">
      <div className="container d-flex"style={{justifyContent:"center"}}>
        <h1 >請先登入！</h1></div>
        <ScaleLoader  loading={true} cssOverride={override} size={50} />

      <div style={{color:'white'}}>{setTimeout(() => {
        navigate("/user/login");
      }, 1000)}</div>
    </div>
  );
}

export default Cart;
