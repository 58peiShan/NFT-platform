import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import withRouter from "../../component/withRouter";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      account: "",
      mail: "",
      password: "",
      passwordConfirm: "",
      accountMsg: "",
      mailMsg: "",
      passwordMsg: "",
      submitCheck: false,
    };
  }
  checkAccount = account => {
    if (account.length >= 6 && account.length <= 12) {
      fetch(`http://localhost:5000/user/${account}`)
        .then(res => res.text())
        .then((data) => {
          this.setState({
            account: account,
            accountMsg: data,
          });
        });
    } else {
      this.setState({
        accountMsg: "帳號長度需在6~12間",
      });
      return;
    }
  };

  checkMail = (mail) => {
    if (mail.includes("@")) {
      fetch(`http://localhost:5000/user/mail/${mail}`)
        .then((res) => res.text())
        .then((data) => {
          this.setState({
            mail: mail,
            mailMsg: data,
          });
        });
    } else {
      this.setState({
        mailMsg: "格式錯誤",
      });
      return;
    }
  };
  signIn = (e) => {
    e.preventDefault();
    if (
      this.state.account == "" ||
      this.state.mail == "" ||
      this.state.passwordConfirm == "" ||
      this.state.password == "" ||
      this.state.passwordMsg !== "" ||
      this.state.accountMsg !== "" ||
      this.state.mailMsg !== ""
    ) {
      alert("資料不完整！");
    } else {
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
        .then((data) => {
          if (data.ok) {
            () => {
              this.setState({
                account: "",
                mail: "",
                password: "",
                passwordConfirm: "",
              });
            },
              alert("註冊成功，回登入頁"),
              this.props.navigate("/user/login");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  render() {
    return (
      <div className="login d-flex flex-column">
        <h1>Welcome</h1>
        <form action="" name="signin">
          <div className="userContainer d-flex">
            <input
              type="text"
              placeholder="account"
              onChange={(e) => this.checkAccount(e.target.value)}
            />
            <p>{this.state.accountMsg}</p>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => this.checkMail(e.target.value)}

            />
            <p>{this.state.mailMsg}</p>
            <input
              type={this.state.canSee ? "text" : "password"}
              placeholder="password"
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
                })
              }
            />
            <p></p>
            <input
              type={this.state.canSee ? "text" : "password"}
              placeholder="password comfirm"
              onChange={(e) => {
                this.setState({
                  passwordConfirm: e.target.value,
                });
                if (e.target.value !== this.state.password) {
                  this.setState({
                    passwordMsg: "兩次密碼不一致",
                  });
                } else {
                  this.setState({
                    passwordMsg: "",
                  });
                }
              }}
            />
            <span onClick={() => this.setState({ canSee: !this.state.canSee })}>
              {this.state.canSee ? (
                <FaEye className="iconSignin" style={{ color: "gray" }} />
              ) : (
                <FaEyeSlash className="iconSignin" style={{ color: "gray" }} />
              )}
            </span>
            <p>{this.state.passwordMsg}</p>
          </div>
          <div className="">
            <button type="button" className="btnSec" onClick={this.signIn}>註冊</button>
            <button type="button" className="btnSec">
              <Link to="/user/login">已有帳號，登入</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
