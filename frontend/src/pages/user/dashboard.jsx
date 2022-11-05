import React, { useEffect, useState, useRef } from "react";
import {
  FaEdit,
  FaUndo,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  if (localStorage.getItem("auth")) {
    const collectionList = useSelector(
      (state) => state.userReducer.collectionId
    );
    const token = localStorage.getItem("auth");
    const nameRef = useRef(null);
    const mailRef = useRef(null);
    const [userdata, setUserdata] = useState({});
    const [isdisabled, setIsdisabled] = useState(true);
    const [isdisabled_name, setIsdisabled_name] = useState(true);
    const [trans, setTrans] = useState(0);
    let idx = 0;
    useEffect(() => {
      fetch(`http://localhost:5000/user/dashboard`, {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      })
        .then((res) => res.json())
        .then((data) => setUserdata(data));
    }, [token]);

    const changeImg = () => {
      if (parseInt(idx) > parseInt(collectionList.length - 1)) {
        setTrans(0);
      } else if (idx < 0) {
        setTrans(trans);
      }
      setTrans(
        Math.abs(trans) >= (120 * (collectionList.length - 1)) / 2
          ? 0
          : trans + -idx * 120
      );
    };

    const editName = (e) => {
      if (e.key === "Enter") {
        setIsdisabled_name(true);
        fetch(`http://localhost:5000/user/editName`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: nameRef.current.value,
          }),
        })
          .then((res) => res.text())
          .then((data) => localStorage.setItem("auth", data));
      }
    };
    const editMail = (e) => {
      if (e.key === "Enter") {
        setIsdisabled(true);
        if (mailRef.current.value.includes("@")) {
          fetch(`http://localhost:5000/user/editMail`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              mail: mailRef.current.value,
            }),
          })
            .then((res) => res.text())
            .then((data) => localStorage.setItem("auth", data));
        } else {
          alert("格式錯誤");
          mailRef.current.value = "";
        }
      } else {
        return;
      }
    };
    const nameChangeHandler = () => {
      setIsdisabled_name(false);
      setTimeout(() => {
        nameRef.current.focus();
      }, 50);
    };
    const mailChangeHandler = () => {
      setIsdisabled(false);
      setTimeout(() => {
        mailRef.current.focus();
      }, 50);
    };
    const cancelEdit = () => {
      setIsdisabled(true);
      mailRef.current.value = "";
    };

    return (
      <>
        <div className="d-flex flex-column" style={{ margin: "auto" }}>
          <div className="name d-flex" onDoubleClick={nameChangeHandler}>
            <input
              className="nameEdit"
              ref={nameRef}
              placeholder={
                userdata.userName ? userdata.userName : "set my nickname"
              }
              onKeyPress={(e) => editName(e)}
              disabled={isdisabled_name}
            ></input>
            <span className="sm-none" style={{ color: "#dee" }}>
              {isdisabled_name
                ? "double click to edit"
                : "press Enter to submit"}
            </span>
            <FaEdit className="sm-show" onClick={nameChangeHandler} />
          </div>
          <div className="login dashboard">
            <div className="userdatas">
              <h4> Account</h4>
              <div className="userdata">{userdata.account}</div>
              <div
                className="d-flex"
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <h4>Email</h4>
                <FaEdit
                  className="sm-show"
                  onClick={mailChangeHandler}
                  style={{
                    marginLeft: "5px",
                  }}
                />
              </div>
              <div onDoubleClick={mailChangeHandler}>
                <input
                  className="mailEdit"
                  ref={mailRef}
                  placeholder={userdata.email}
                  onKeyPress={(e) => editMail(e)}
                  disabled={isdisabled}
                ></input>
                <FaUndo
                  style={{ display: isdisabled ? "none" : "inline" }}
                  onClick={cancelEdit}
                />
              </div>
              My Collection
              <hr />
              <div className="userdata d-flex carousel">
                <div
                  className="imgContainer d-flex"
                  style={{
                    transform: `translateX(${trans}px)`,
                    transition: ".3s",
                  }}
                >
                  {collectionList.map((v, i) => (
                    <div className="imgBox" key={i}>
                      <img src={`../img/${v.img}`} alt="" />
                    </div>
                  ))}
                </div>
                <div
                  className="btnContainer d-flex"
                  style={{ display: collectionList.length > 2 ? "" : "none" }}
                >
                  <FaAngleDoubleLeft
                    onClick={() => {
                      idx--, changeImg();
                    }}
                    className="prev"
                  />

                  <FaAngleDoubleRight
                    onClick={() => {
                      idx++, changeImg();
                    }}
                    className="next"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/user/login" replace />;
  }
}

export default Dashboard;
