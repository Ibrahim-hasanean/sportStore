var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
const passport = require("passport");
const validate = require("./middleware/validator");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
/*{
    useNewUrlParser: true,
    useUnifiedTopology: true
  } */
mongoose.connect(
  "mongodb+srv://ibrahim:authdb@cluster0-6qxcp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) console.log(error);
    else console.log("mongoose connect");
  }
);

require("./config/googleAuth-setup");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", validate, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log("listen on 3000");
});
module.exports = app;
