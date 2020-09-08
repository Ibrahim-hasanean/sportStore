const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const code = require("../models/code");
const sendMail = require("../middleware/sendMail");
module.exports = {
  signUp: async (req, res, next) => {
    let createUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    let sendCode = await sendMail(createUser, "email verification");

    res.json({ status: 200, message: "account created and code is sent" });
  },
  verify: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    let userCode = await code.findOne({ userId: user._id });
    if (req.body.code !== userCode.code) {
      res.status(400);
      return res.json({ status: 400, message: "wrong verification" });
    }
    let updateUser = await User.findByIdAndUpdate(user._id, {
      verified: true
    });

    return res.json({ status: 200, message: "verification success" });
  },
  login: async (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
      res.status(400);
      return res.json({ status: 400, message: "email is not valid" });
    }
    let user = await User.findOne({ email: req.body.email });
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
    console.log(process.env.JWT_KEY);   

    return res.status(200).json({
      status: 200,
      message: "authenticate success",
      token: userToken,
      verified: user.verified
    });
  }
};
