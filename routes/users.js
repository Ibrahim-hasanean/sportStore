var express = require("express");
var router = express.Router();
const code = require("../models/code");
const User = require("../models/user");
/* GET users listing. */
router.get("/profile", function(req, res, next) {
  res.status(200);
  res.json({
    status: 200,    
    email: req.user.email,
    id: req.user._id,
    name:req.user.name
  });
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  //res.redirect("/login");
  return res.send("logout");
});

module.exports = router;
