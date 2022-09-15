var express = require("express");
var router = express.Router();
const db = require("../util/database");
router.get(`/:account`, async (req, res) => {
  const account = req.params.account;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT account FROM users WHERE account = ?";
  const [datas] = await db.query(sql, [account]);
  if (datas.length == 0) {
    console.log(datas);
    res.send("");
  } else {
    console.log(datas);
    res.send("帳號已存在");
  }
});
router.get(`/mail/:mail`, async (req, res) => {
  const mail = req.params.mail;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT email FROM users WHERE email = ?";
  const [datas] = await db.query(sql, [mail]);
  if (datas.length == 0) {
    console.log(datas);
    res.send("");
  } else {
    console.log(datas);
    res.send("此mail已註冊過");
  }
});

module.exports = router;
