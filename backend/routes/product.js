const express = require("express");
const axios = require('axios');
const router = express.Router();
const db = require("../util/database");
const NFT_API_KEY = process.env.NFT_API_KEY;
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
//作品詳細資料

router.get(`/detail`, async (req, res) => {
  try{
    res.set("Access-Control-Allow-Origin", "*");
    add = req.query.add;
    const {data} =await axios.get (`https://services.tokenview.io/nft/eth/blockdata/collection/tokentrans/${add}/1/5?apikey=${NFT_API_KEY}`)
    res.json(data.data)
    console.log(data.data.data);
  }
  catch(error){
    console.error(error.message)
    res.status(500).json({ type: 'error', message: error.message })
  }})

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

router.get('/nft/blockdata', async (req, res) => {
  try {
    const { data } = await axios.get(`https://services.tokenview.io/nft/eth/blockdata/transactions/all/1/10?apikey=${NFT_API_KEY}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data.data.data);
  } catch (error) {
    console.error(`報告: ${error.message}`);
    res.status(500).json({ type: 'error', message: error.message });
  }
});

router.get('/nft/top10', async (req, res) => {
  try {
    const { data } = await axios.get(`https://services.tokenview.io/nft/eth/blockdata/statistics/tokens/721/1/10?apikey=${NFT_API_KEY}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (error) {
    console.error(`報告: ${error.message}`);
    res.status(500).json({ type: 'error', message: error.message });
  }
});

//NFT前10名交易量的詳細
router.get('/nft/top10each', async (req, res) => {
  try {
    const add = JSON.parse(req.query.add);
    const result = await Promise.all(add.map(async (item) => {
      const { data } = await axios.get(`https://services.tokenview.io/nft/eth/blockdata/collection/info/${item.tokenAddress}?apikey=${NFT_API_KEY}`);
      return data.data;
    }));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(result);
  } catch (error) {
    res.status(500).json({ type: 'error', message:'error.message' });
  }
});

module.exports = router;
