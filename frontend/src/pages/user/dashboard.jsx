import React, { useEffect, useState, useRef } from "react";
import { FaUndo } from "react-icons/fa";
import { Navigate } from "react-router-dom";

function Dashboard() {
  if (localStorage.getItem("auth")) {
    const nameRef = useRef(null);
    const mailRef = useRef(null);
    const [userdata, setUserdata] = useState({});
    const [isdisabled, setIsdisabled] = useState(true);
    const [isdisabled_name, setIsdisabled_name] = useState(true);
    const token = localStorage.getItem("auth");
    useEffect(() => {
      fetch(`http://localhost:5000/user/dashboard`, {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      })
        .then((res) => res.json())
        .then((data) => setUserdata(data));
    }, [token]);

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
              onKeyPress={(e) => {
                editName(e);
              }}
              disabled={isdisabled_name}
            ></input>
          </div>
          <span style={{ color: "#dee" }}>
            {isdisabled_name ? "double click to edit" : "press Enter to submit"}
          </span>
          <div className="login" style={{ width: "50vw", margin: "20px auto" }}>
            <div className="userdatas">
              account<div className="userdata">{userdata.account}</div>
              email
              <div onDoubleClick={mailChangeHandler}>
                <input
                  className="mailEdit"
                  ref={mailRef}
                  placeholder={userdata.email}
                  onKeyPress={(e) => {
                    editMail(e);
                  }}
                  disabled={isdisabled}
                ></input>
                <FaUndo
                  style={
                    isdisabled ? { display: "none" } : { display: "inline" }
                  }
                  onClick={cancelEdit}
                />
              </div>
              purchase
              <hr />
              <div className="userdata">{userdata.purchase}</div>
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
