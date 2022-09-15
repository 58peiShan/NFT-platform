import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const purchaseList = JSON.parse(localStorage.getItem("purchase"));
  const list = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.productReducer);
  // const list = [
  //   { id: 3, workName: "Spider Tanks", price: 5, img: "music1.gif", amount: 1 },
  // ];
  const handleDel = (id) => {
    const i = purchaseList.findIndex((element) => element == id);
    let remove = purchaseList.splice(i, i);
    localStorage.setItem("purchase", "[" + purchaseList + "]");
  };

  const  outputList =  list.map((v, i) => {
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
