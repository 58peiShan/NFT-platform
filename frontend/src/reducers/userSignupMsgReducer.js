const userSignupMsgReducer = (state = "", action) => {
  switch (action.type) {
    case "ACCOUNT_MSG":
      return (state = "帳號已有人使用");
    default:
      return state;
  }
};

export default userSignupMsgReducer;
