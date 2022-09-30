var express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin:`${process.env.CORS}`,
  })
);
app.use(bodyParser.json());

//定義router
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const addUserRouter = require("./routes/addUser");

app.use("/product", productRouter);
app.use("/adduser", addUserRouter);
app.use("/user", userRouter);

app.listen(5000, function () {
  console.log(`server now is running at port 5000`);
});
