import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const purchaseList = JSON.parse(localStorage.getItem("purchase"));
  const list = useSelector((state) => state.cartlist.purchase) || [];
  const total = useSelector((state) => state.productReducer);
  const handleDel = id => {
    dispatch({ type: "PURCHASE_RESET" });
    dispatch({ type: "DECREASE" });
    const i = purchaseList.findIndex(element => element == id);
    if (i === 0) {
      let remove = purchaseList.splice(0, 1);
    } else {
      let remove = purchaseList.splice(i, i);
    }
    localStorage.setItem("purchase", JSON.stringify(purchaseList));
  };
  const outputList = list.map((v, i) => (
    <tr key={i}>
      <td>
        <img src={`/img/${v.img}`} alt="" />
      </td>
      <td>{v.workName}</td>
      <td>{v.price}</td>
      <td>{v.amount}</td>
      <td>{v.price * v.amount}</td>
      <td onClick={(e) => handleDel(v.id)}>
        <FaTrash />
      </td>
    </tr>
  ));

  return (
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
      </div>
    </>
  );
}

export default Cart;
