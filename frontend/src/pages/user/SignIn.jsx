import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <div className="divcontainer d-flex ">
        <div className="login d-flex flex-column">
          <h1>Hi</h1>
          <div>
            <input type="text" placeholder="account" />
            <input type="password" placeholder="password" />
          </div>
          <div className="d-flex">
            <button>註冊</button>
            <Link to="/user">已有帳號，登入</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
