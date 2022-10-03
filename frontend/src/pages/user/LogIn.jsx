import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import withRouter from "../../component/withRouter";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      loginMsg: "",
      canSee: false,
    };
  }

  hangleLogin = (e) => {
    e.preventDefault();
    if (this.state.account && this.state.password) {
      fetch(`http://localhost:5000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          account: this.state.account,
          password: this.state.password,
        }),
      })
        .then((res) => res.text())
        .then((data) => {
          if (data.length < 10) {
            this.setState({ loginMsg: data });
            return;
          } else {
            this.props.navigate("/user/dashboard"),
              localStorage.setItem("auth", data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("欄位不完整！");
    }
  };
  render() {
    return (
      <div className="login d-flex flex-column">
        <h1>Hi</h1>
        <form action="">
          <div className="userContainer d-flex">
            <input
              type="text"
              placeholder="account"
              onChange={(e) => this.setState({ account: e.target.value })}
            />
            <input
              type={this.state.canSee ? "text" : "password"}
              placeholder="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <span onClick={() => this.setState({ canSee: !this.state.canSee })}>
              {this.state.canSee ? (
                <FaEye className="icon" style={{ color: "gray" }} />
              ) : (
                <FaEyeSlash className="icon" style={{ color: "gray" }} />
              )}
            </span>
          </div>
          <p style={{ color: "white", fontSize: "9px" }}>
            {this.state.loginMsg}
          </p>
          <div className="d-flex">
            <button type="button" className="btnSec" onClick={this.hangleLogin}>
              登入
            </button>
            <button type="button" className="btnSec">
              <Link to="/user/SignIn">未有帳號？</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
