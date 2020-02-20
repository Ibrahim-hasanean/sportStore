var express = require("express");
var router = express.Router();
const code = require("../models/code");
const User = require("../models/user");
/* GET users listing. */
router.get("/private", function(req, res, next) {
  res.send("hello from private route " + req.body.user.name);
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  //res.redirect("/login");
  return res.send("logout");
});

module.exports = router;
