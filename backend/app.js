var express = require('express');
const app = express()

//定義router
const productRouter = require('./routes/product')



app.use('/product',productRouter)


app.listen(5000,function () {
  console.log('server now is running at port 5000');
});