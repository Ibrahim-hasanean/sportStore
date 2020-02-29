const express = require("express");
const router = express.Router();
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
require("../config/facebookAuth-setup.js");
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

/*
router.get(
  "/google/auth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "consent",
    accessType: "offline"
  })
);
router.get(
  "/google/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "localhost:3000/admin",
    session: false,
    prompt: "consent",
    accessType: "offline"
  }),
  (req, res) => {
    let userToken = jwt.sign({ id: req.user._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    //set token in cookie
    res.cookie("access_token", "Bearer " + userToken, {
      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    });

    res.send("google login success");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: "email"
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    scope: "email",
    session: false
  }),
  (req, res) => {
    let userToken = jwt.sign({ id: req.user._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    //set token in cookie
    res.cookie("access_token", "Bearer " + userToken, {
      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    });
    res.status(200);
    res.send("face book login succecc");
  }
);*/
