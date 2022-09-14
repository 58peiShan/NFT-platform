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
      <Routes>
        <Route path="/user/SignIn" element={<SignIn />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default User;
