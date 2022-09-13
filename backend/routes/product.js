var express = require('express');
var router = express.Router();
const db = require('../util/database');

router.get(`/:sort`,async(req,res)=>{
    console.log(req.params.sort);
    const sort = req.params.sort
    res.set('Access-Control-Allow-Origin', '*');
    const sql = "SELECT * FROM artwork WHERE category=?"
    const [datas] = await db.query(sql,[sort]);
    res.json(datas);
})

module.exports = router;