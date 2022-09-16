var express = require("express");
var router = express.Router();
const db = require("../util/database");

router.get(`/`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM artwork";
  const [datas] = await db.query(sql);
  res.json(datas);
});
router.get(`/:sort`, async (req, res) => {
  const sort = req.params.sort;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM artwork WHERE category=?";
  const [datas] = await db.query(sql, [sort]);
  res.json(datas);
});

router.get(`/id/:id`, async (req, res) => {
  const id = req.params.id;
  res.set("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM artwork WHERE id=?";
  const [datas] = await db.query(sql, [id]);
  res.json(datas);
});

module.exports = router;
