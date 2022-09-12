import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

function User() {
  return (
    <>
      <div className="divcontainer d-flex ">
        <div className="login d-flex flex-column">
        <h1>Hi</h1>
          <input type="text" placeholder="account"/>
          <input type="email" />
          <input type="password" />
        </div>
      </div>
    </>
  );
}

export default User;
