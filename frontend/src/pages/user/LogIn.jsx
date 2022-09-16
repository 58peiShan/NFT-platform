import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <>
        <h1>Hi</h1>
        <form action="">
          <input type="text" placeholder="account" />
          <input type="password" placeholder="password" />
          <div className="d-flex">
            <button>登入</button>
            <Link to="/user/SignIn">未有帳號？</Link>
          </div>
        </form>
      </>
    );
  }
}
export default Login;
