import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import React from "react";
import LogIn from "./LogIn.jsx";
import SignIn from "./SignIn.jsx";
import Dashboard from "./dashboard.jsx";

function User() {
  const loggedIn = localStorage.getItem("auth");
  return (
      <div className="divcontainer d-flex " style={{ overflow: "hidden" }}>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/login"
            element={
              loggedIn ? <Navigate to="/user/dashboard" replace /> : <LogIn />
            }
          ></Route>
        </Routes>
      </div>
  );
}

export default User;
