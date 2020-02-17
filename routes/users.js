var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/private", function(req, res, next) {
  res.send("hello from private route");
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  return res.send("logout");
  res.redirect("/login");
});

module.exports = router;
