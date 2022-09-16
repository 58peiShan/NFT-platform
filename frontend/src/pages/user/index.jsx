import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import LogIn from "./LogIn.jsx";
import SignIn from "./SignIn.jsx";

function User() {
  return localStorage.getItem("id") ? (
    <h1>hi,{localStorage.getItem("id")}</h1>
  ) : (
    <>
      <div className="divcontainer d-flex ">
        <div className="login d-flex flex-column">
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Login" element={<LogIn />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default User;
