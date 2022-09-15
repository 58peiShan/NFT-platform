import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    account: "",
    mail: "",
    password: "",
    accountMsg: "",
    mailMsg: "",
  };
  render() {
    const checkAccount = (account) => {
      if (account) {
        fetch(`http://localhost:5000/user/${account}`)
          .then((res) => res.text())
          .then((data) => {
            this.setState({
              account: account,
              accountMsg: data,
            });
          });
      } else {
        return;
      }
    };
    const checkMail = (mail) => {
      if (mail) {
        fetch(`http://localhost:5000/user/mail/${mail}`)
          .then((res) => res.text())
          .then((data) => {
            this.setState({
              mail: mail,
              mailMsg: data,
            });
          });
      } else {
        return;
      }
    };
    const signIn = (e) => {
      e.preventDefault();

      fetch(`http://localhost:5000/adduser`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: this.state.account,
          mail: this.state.mail,
          password: this.state.password,
        }),
      })
        .then(
          (data) =>console.log( data.json()),
          this.setState({
            account: "",
            mail: "",
            password: "",
          })
        )
        .catch((error) => console.log(error));
    };
    return (
      <>
        <h1>Welcom</h1>
        <form action="">
          <div>
            <input
              type="text"
              placeholder="account"
              onChange={(e) => {
                checkAccount(e.target.value);
              }}
            />
            <p style={{ color: "white", fontSize: "9px" }}>
              {this.state.accountMsg}
            </p>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => {
                checkMail(e.target.value);
              }}
            />
            <p style={{ color: "white", fontSize: "9px" }}>
              {this.state.mailMsg}
            </p>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
            <input type="passwordComfirm" placeholder="password comfirm" />
          </div>
          <div className="d-flex">
            <button onClick={signIn}>註冊</button>
            <Link to="/user/login">已有帳號，登入</Link>
          </div>
        </form>
      </>
    );
  }
}

export default SignIn;