var express = require("express");
var router = express.Router();
const db = require("../util/database");
const sha1 = require('sha1')

router.post(`/`, async (req, res) => {
  const account = req.body.id;
  const mail = req.body.mail;
  const password = sha1(req.body.password);
  const sql =
    "INSERT INTO `users` (`account`, `password`, `email`) VALUES (?, ?, ?)";
  if (account && mail && password) {
    const [datas] = await db.query(sql, [account, password, mail]);
    res.json(datas);
  } else {
    const [datas] = [];
    res.json(datas);
  }
});

module.exports = router;
