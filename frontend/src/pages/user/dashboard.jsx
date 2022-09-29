import React, { useEffect, useState, useRef } from "react";
import { FaUndo, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
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
      if (idx > collectionList.length - 1) {
        idx = 0;
      } else if (idx < 0) {
        idx = 0;
      }
      setTrans(`${-idx * 120}px`);
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
          <div onDoubleClick={nameChangeHandler}>
            <input
              className="nameEdit"
              ref={nameRef}
              placeholder={userdata.userName ? userdata.userName : "none"}
              onKeyPress={(e) => editName(e)}
              disabled={isdisabled_name}
            ></input>
          </div>
          <span style={{ color: "#dee" }}>
            {isdisabled_name ? "double click to edit" : "press Enter to submit"}
          </span>
          <div className="login" style={{ width: "50vw", margin: "20px auto" }}>
            <div className="userdatas">
              Account<div className="userdata">{userdata.account}</div>
              Email
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
                  style={{ transform: `translateX(${trans})` }}
                >
                  {collectionList.map((v, i) => (
                    <div className="imgBox" key={i}>
                      <img src={`../img/${v.img}`} alt="" />
                    </div>
                  ))}
                </div>
                <div
                  className="btnContainer d-flex"
                  style={{ display: collectionList.length > 8 ? "" : "none" }}
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
