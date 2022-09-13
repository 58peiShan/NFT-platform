import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

function Cart() {
  // const list = [];
  const id = JSON.parse(localStorage.getItem("purchase"));
  const [list, setList] = useState([]);

  const handleDel = (id) => {};
  useEffect(() => {
    if (id) {
      for (let i = 0; i < id.length; i++) {
        fetch(`http://localhost:5000/product/id/${id[i].item}`)
          .then((res) => res.json())
          .then((data) => {
            // list.push(...data),
            setList(...list, data);
            console.log("setList1");
            console.log(list);
          });
      }
    }
  }, []);
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
            {list.length < 1 ? (
              <tr>
                <td colSpan={6}>無資料</td>
              </tr>
            ) : (
              list.map((v, i) => {
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
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
