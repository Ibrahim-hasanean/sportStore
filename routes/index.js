const express = require("express");
const router = express.Router();
const User = require("../models/user")
const inputValidator = require("../middleware/inputValidator");
const { signUp, verify, login } = require("../controller/index");
const { facebookLogin, googleLogin } = require("../controller/socialLogin");
const {
  forgetPassword,
  confirmCode,
  newPassword
} = require("../controller/forgetPassword.js");
require("dotenv").config();
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});
router.post("/signup", inputValidator, signUp);

router.post("/verify", verify);
router.post("/login", login);
router.post("/facebooklogin", facebookLogin);
router.post("/googlelogin", googleLogin);
router.post("/forgetpassword", forgetPassword);
router.post("/confirmcode", confirmCode);
router.post("/newpassword", newPassword);
module.exports = router;
