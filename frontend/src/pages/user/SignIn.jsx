import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  render() {
    const checkAccount = (account) => {
      if (account.length >= 6 && account.length <= 12) {
        fetch(`http://localhost:5000/user/${account}`)
          .then((res) => res.text())
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

    const checkMail = (mail) => {
      if (mail.includes("@")) {
        fetch(`http://localhost:5000/user/mail/${mail}`)
          .then((res) => res.text())
          .then((data) => {
            this.setState({
              mail: mail,
              mailMsg: data,
            });
          },
          );
      } else {
        this.setState({
          mailMsg: "格式錯誤",
        });
        return;
      }
    };

    const signIn = (e) => {
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
              },alert('註冊成功，回登入頁'),
              this.props.navigate("/user/login");
            }
          })
          .catch((error) => console.log(error));
      }
    };
    return (
      <div className="login d-flex flex-column">
        <h1>Welcome</h1>
        <form action="" name="signin">
          <div>
            <input
              type="text"
              placeholder="account"
              onChange={(e) => {
                checkAccount(e.target.value);
              }}
            />
            <p>{this.state.accountMsg}</p>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => {
                checkMail(e.target.value);
              }}
            />
            <p>{this.state.mailMsg}</p>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
            <p></p>
            <input
              type="password"
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
            <p>{this.state.passwordMsg}</p>
          </div>
          <div className="">
            <button>
              <Link to="/user/login">已有帳號，登入</Link>
            </button>
            <button onClick={signIn}>註冊</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
