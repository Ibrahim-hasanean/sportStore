const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const code = require("../models/code");
const sendMail = require("../middleware/sendMail");
module.exports = {
  signUp: async (req, res, next) => {
    let cryptPassword = bcrypt.hashSync(req.body.password,10)
    let createUser = await User.create({
      email: req.body.email,
      password: cryptPassword,
      name: req.body.name
    });
    let sendCode = await sendMail(createUser, "email verification");
    let userToken = jwt.sign({ userId: createUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.json({ status: 200, message: "account created and code is sent" , email:createUser.email, name:createUser.name , token:userToken  });
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
      return res.status(400).json({ status: 400, message: "email is not valid" });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {      
      return res.status(403).json({ status: 403, message: "user not found" });
    }
    if(!req.body.password) return res.status(400).json({ status: 400, message: "password required" });
    let isPass = bcrypt.compareSync(req.body.password, user.password);
    console.log(isPass)
    if (!isPass) {
      console.log("wrong password")
      return res.status(400).json({ status: 400, message: "wrong password" });
      //return res.status(401).s("wrong password");
    }
    let userToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    console.log(process.env.JWT_KEY);   
    return res.status(200).json({
      status: 200,
      message: "authenticate success",
      token: userToken,
      verified: user.verified,
      name:user.name,
      email:user.email
    });
  }
};
