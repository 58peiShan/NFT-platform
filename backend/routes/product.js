const express = require("express");
const request = require("request");
const router = express.Router();
const db = require("../util/database");
require("dotenv").config();

//作品名搜尋篩選
router.get(`/`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.query.search) {
    const search = req.query.search;
    const sql = "SELECT * FROM `artwork` WHERE `workName` LIKE ?";
    const [datas] = await db.query(sql, [`%${search}%`]);
    res.json(datas);
  } else {
    const sql = "SELECT * FROM artwork";
    const [datas] = await db.query(sql);
    res.json(datas);
  }
});

//分類篩選
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

router.get(`/nft/blockdata`, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  request(
    {
      url: `https://services.tokenview.io/nft/eth/blockdata/transactions/all/1/10?apikey=${process.env.NFT_API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

router.get(`/nft/top10`, async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  request(
    {
      url: `https://services.tokenview.io/nft/eth/blockdata/statistics/tokens/721/1/10?apikey=${process.env.NFT_API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body))
    }
  );
});

router.get(`/nft/top10each`, async (req, res) => {
  add = req.query.add
  res.setHeader("Access-Control-Allow-Origin", "*");
  request(
    {
      url: `https://services.tokenview.io/nft/eth/blockdata/collection/info/${add}?apikey=${process.env.NFT_API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body))
    }
  );
});
module.exports = router;
