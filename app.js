var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
const cors = require("cors");
const validate = require("./middleware/validator");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qnafb.mongodb.net/sport-store?retryWrites=true&w=majority`,
  {useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{console.log("mogoose connected");}).catch(
  error => {
    if (error) console.log(error);
    else console.log("mongoose connect");
  }
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", indexRouter);
app.get("/test", (req, res) => {
  res.send("test success");
});
app.use("/api/v1/users", validate, usersRouter);

app.listen(port, () => {
  console.log("listen on 3000");
});
module.exports = app;
