const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto-random-string");
const Code = require("../models/code");
const verifyValidator = require("../middleware/VerifyValidator");
const code = require("../models/code");

require("dotenv").config();
/* GET home page. */
require("../config/facebookAuth-setup.js");
router.get("/", function(req, res, next) {
  res.render("index");
});
router.post("/signup", async function(req, res, next) {
  console.log(req.body.email);
  let user = await User.findOne({ email: req.body.email }),
    password = req.body.password;
  if (user) {
    res.status(409);
    return res.json({ status: 409, message: "email is already signed up" });
  }
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.json({ status: 400, message: "email is not valid" });
  }
  if (!password) {
    res.status(401);
    return res.json({ status: 401, message: "password is required" });
  } else {
    if (String(password).length < 8) {
      res.status(401);
      return res.json({
        status: 401,
        message: "password must be 8 character"
      });
    }
    if (!validator.isAlphanumeric(password)) {
      res.status(401);
      return res.json({
        status: 401,
        message: "password must contain numbers and letters"
      });
    }
  }

  let createUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASS
    },
    secure: true
  });
  let code = crypto({ length: 4 });
  let userCode = Code.create({ code, userId: createUser._id });
  transporter.sendMail(
    {
      from: process.env.TRANSPORT_EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "email verificaton", // Subject line
      text: "this is your verification code", // plain text body
      html: ` code  <b>${code}</b>` // html body
    },
    (err, data) => {
      if (err) console.log(err.message);
    }
  );
  res.json({ status: 200, message: "account created and code is sent" });
});

router.post("/verify", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  let codeObject = await code.findOne({ userId: user._id });
  console.log(req.body.email);
  console.log(req.body.code);
  if (req.body.code !== codeObject.code) {
    res.status(400);
    return res.json({ status: 400, message: "wrong verification" });
  }

  let updateUser = await User.findByIdAndUpdate(user._id, {
    verified: true
  });

  return res.json({ status: 200, message: "verification success" });
});
router.post("/login", async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.json({ status: 400, message: "email is not valid" });
  }
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(403);
    return res.json({ status: 403, message: "user not found" });
  }
  let isPass = bcrypt.compareSync(req.body.password, user.password);
  if (!isPass) {
    res.status(400);
    return res.json({ status: 400, message: "wrong email/password" });
  }
  let userToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  res.status(200);
  console.log(process.env.JWT_KEY);

  return res.json({
    status: 200,
    message: "authenticate success",
    token: userToken,
    verified: user.verified
  });
});

router.post("/facebooklogin", (req, res, next) => {
  let userData = req.body.userData;
  console.log(userData);
  let ExistUser = await User.find({ email: userData.email });
  if (ExistUser) {
    console.log(ExistUser);
    let userToken = jwt.sign({ userId: ExistUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    return res.json({
      status: 200,
      message: "facebook login success",
      token: userToken
    });
  }
  let newUser = await User.create({
    name: userData.name,
    email: userData.email,
    facebookId: userData.id,
    verified: true
  });
  console.log(newUser);
  let userToken = jwt.sign({ userId: "asdasd" }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  res.json({
    status: 200,
    message: "facebook login success",
    token: userToken
  });
});

router.post("/googlelogin", async (req, res, next) => {
  let userData = req.body.userData;
  console.log(userData);
  let ExistUser = await User.find({ email: userData.email });
  if (ExistUser) {
    console.log(ExistUser);
    let userToken = jwt.sign({ userId: ExistUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    return res.json({
      status: 200,
      message: "facebook login success",
      token: userToken
    });
  }
  let newUser = await User.create({
    name: userData.name,
    email: userData.email,
    facebookId: userData.id,
    verified: true
  });
  console.log(newUser);
  let userToken = jwt.sign({ userId: "asdasd" }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  res.json({
    status: 200,
    message: "facebook login success",
    token: userToken
  });
});

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

router.post("/forgetpassword", async (req, res) => {
  if (!req.body.email)
    return res.json({ status: 404, message: "must provide email" });
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ status: 400, message: "email is not sing up" });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASS
    }
  });
  let deletCode = await Code.findOneAndDelete({ userId: user._id }); //delete previous user code
  let code = crypto({ length: 4 });
  console.log(user);
  let userCode = await Code.create({ code, userId: user._id });
  transporter.sendMail(
    {
      from: process.env.TRANSPORT_EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "email verificaton", // Subject line
      text: "this is your verification code", // plain text body
      html: ` code  <b>${code}</b>` // html body
    },
    (err, data) => {
      if (err) console.log(err.message);
      return res.json({ status: 200, message: "code is sent to your email" });
    }
  );
});

router.post("/confirmcode", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  let codeObject = await code.findOne({ userId: user._id });
  if (req.body.code !== codeObject.code) {
    res.status(400);
    return res.json({ status: 400, message: "wrong verification" });
  }

  return res.json({ status: 200, message: "code is true" });
});
router.post("/newpassword", async (req, res) => {
  const { email, inputCode, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!newpassword)
    return res
      .status(400)
      .json({ status: 400, message: "password must be 8 character" });
  let newpassword = bcrypt.hashSync(password, 10);
  console.log("password ", newpassword);
  let updateUser = await User.findByIdAndUpdate(user._id, {
    password: newpassword
  });
  return res.json({ message: "password reset" });
});

router.get("/admin", (req, res) => {
  res.send("facebook redirect success");
});
module.exports = router;
