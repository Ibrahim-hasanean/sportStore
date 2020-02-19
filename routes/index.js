const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const validator = require("validator");

require("dotenv").config();
/* GET home page. */
require("../config/facebookAuth-setup.js");
router.get("/", function(req, res, next) {
  res.render("index");
});
router.post("/signup", async function(req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(403);
    return res.json({ status: 403, message: "email is hold" });
  }
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.json({ status: 400, message: "email is not valid" });
  }
  let createUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  res.status(200);
  return res.json({
    email: createUser.email
  });
});

router.post("/login", async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.json({ status: 400, message: "email is not valid" });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(403);
    return res.json({ status: "403", message: "user not found" });
  }
  let isPass = bcrypt.compareSync(req.body.password, user.password);
  if (!isPass) {
    res.status(400);
    return res.json({ status: "400", message: "wrong email/password" });
  }
  let userToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  console.log(process.env.JWT_KEY);
  //set token in cookie
  res.cookie("access_token", "Bearer " + userToken, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  });
  res.status(200);
  console.log(process.env.JWT_KEY);

  return res.json({
    status: "200",
    message: "authenticate success",
    token: userToken
  });
});

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
    res.send("login success " + req.user.name);
    //   res.redirect("/homepage");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
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
    res.send("it is work");
  }
);

module.exports = router;
