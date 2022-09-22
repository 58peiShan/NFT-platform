import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../component/withRouter";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      loginMsg: "",
    };
  }

  render() {
    const hangleLogin = (e) => {
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
              return
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
    return (
      <div className="login d-flex flex-column">
        <h1>Hi</h1>
        <form action="">
          <input
            type="text"
            placeholder="account"
            onChange={(e) => {
              this.setState({ account: e.target.value });
            }}
          />
          <p></p>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <p style={{ color: "white", fontSize: "9px" }}>
            {this.state.loginMsg}
          </p>
          <div className="d-flex">
            <button onClick={hangleLogin}>登入</button>
            <Link to="/user/SignIn">未有帳號？</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
