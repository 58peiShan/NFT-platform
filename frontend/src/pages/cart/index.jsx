import { NavLink } from "react-router-dom";
import React from "react";

function Cart() {
  const list = [];
  console.log(list.length);
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
            </tr>
          </thead>
          <tbody>
            {
              (list.length < 1 ? (
                <tr>
                  <td colSpan={5}>無資料</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <img src={list.img} alt="" />
                  </td>
                  <td>{list.name}</td>
                  <td>{list.price}</td>
                  <td>{list.amount}</td>
                  <td>{list.total}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
