var express = require("express");
var router = express.Router();
const db = require("../util/database");
const jwt = require("jsonwebtoken");
const KEY = "awe16fdsca";
const sha1 = require("sha1");

//進入會員中心初始資料
router.get(`/dashboard`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, KEY);
  const account = decoded.account;
  const sql = "SELECT * FROM users WHERE  `account` = ? ";
  const [datas] = await db.query(sql, [account]);
  if (datas) {
    res.send(...datas);
  } else {
    res.send("nodata");
  }
});

//會員登入處理
router.post(`/`, async (req, res) => {
  const account = req.body.account;
  const password = sha1(req.body.password);
  const sql =
    "SELECT id,purchase FROM `users` WHERE `password` = ? AND `account` = ?;";
  const [datas] = await db.query(sql, [password, account]);
  if (datas.length == 0) {
    res.send("帳號或密碼錯誤！");
  } else {
    const token = jwt.sign(
      {
        id: datas[0].id.toString(),
        account: account.toString(),
        purchase: datas[0].purchase ? datas[0].purchase.toString() : "[]",
      },
      KEY,
      { expiresIn: "1 day" }
    );
    res.send(token);
  }
});

//會員資料編輯處理
router.patch(`/editName`, async (req, res) => {
  const userName = req.body.userName;
  const gottoken = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(gottoken, KEY);
  const id = decoded.id;
  const sql = "UPDATE `users` SET `userName` = ?  WHERE `users`.`id` = ?;";
  const [datas] = await db.query(sql, [userName, id]);
  if (datas) {
    res.send(gottoken);
  } else {
    res.send("修改失敗");
  }
});
router.patch(`/editMail`, async (req, res) => {
  const email = req.body.mail;
  const gottoken = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(gottoken, KEY);
  const id = decoded.id;
  const sql = "UPDATE `users` SET `email` = ?  WHERE `users`.`id` = ?;";
  const [datas] = await db.query(sql, [email, id]);
  if (datas) {
    res.send(gottoken);
  } else {
    res.send("修改失敗");
  }
});
//訂單添加
router.patch(`/addpurchase`, async (req, res) => {
  const gottoken = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(gottoken, KEY);
  const id = decoded.id;
  if (decoded.purchase) {
    purchase = JSON.stringify([
      ...JSON.parse(decoded.purchase),
      ...JSON.parse(req.body.purchase),
    ]);
    purchase2 = [
      ...JSON.parse(decoded.purchase),
      ...JSON.parse(req.body.purchase),
    ];
  } else {
    purchase = req.body.purchase.toString;
    purchase2 = req.body.purchase;
  }
  const sql = "UPDATE `users` SET `purchase` = ?  WHERE `users`.`id` = ?;";
  const sql2 = "UPDATE `artwork` SET `amount` = 0  WHERE `artwork`.`id` = ?;";
  const [datas] = await db.query(sql, [purchase,id]);

  for (let i = 0; i < purchase2.length; i++) {
    const [datas2] = await db.query(sql2, [purchase2[i]]);
    console.log(purchase2);
  }
  if (datas) {
    const token = jwt.sign(
      {
        id: id,
        account: decoded.account.toString(),
        purchase: purchase.toString(),
      },
      KEY,
      { expiresIn: "1 day" }
    );
    res.send(token);
  } else {
    res.send("新增失敗");
  }
});
//會員註冊前置處理
router.get(`/:account`, async (req, res) => {
  const account = req.params.account;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT account FROM users WHERE account = ?";
  const [datas] = await db.query(sql, [account]);
  if (datas.length <= 0) {
    res.send("");
  } else {
    res.send("帳號已存在");
  }
});
router.get(`/mail/:mail`, async (req, res) => {
  const mail = req.params.mail;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT email FROM users WHERE email = ?";
  const [datas] = await db.query(sql, [mail]);
  if (datas.length == 0) {
    res.send("");
  } else {
    res.send("此mail已註冊過");
  }
});

module.exports = router;
