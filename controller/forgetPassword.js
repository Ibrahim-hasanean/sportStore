const User = require("../models/user");
const crypto = require("crypto-random-string");
const sendMail = require("../middleware/sendMail");
const Code = require("../models/code");
const bcrypt = require("bcrypt");
module.exports = {
  forgetPassword: async (req, res) => {
    if (!req.body.email)
      return res.json({ status: 404, message: "must provide email" });
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "email is not sing up" });

    let deletCode = await Code.findOneAndDelete({ userId: user._id }); //delete previous user code
    let code = crypto({ length: 4 });
    const sendCode = await sendMail(user, "forget password code");
    res
      .status(200)
      .json({ status: 200, message: "code is sent to your email" });
  },
  confirmCode: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    let codeObject = await Code.findOne({ userId: user._id });
    if (req.body.code !== codeObject.code) {
      res.status(400);
      return res.json({ status: 400, message: "wrong verification" });
    }

    return res.json({ status: 200, message: "code is true" });
  },
  newPassword: async (req, res) => {
    const { email, code, password } = req.body;
    if (!code)
      return res.status(400).json({ status: 400, message: "code is required" });
    let codeExist = await Code.findOne({ code });
    if (!codeExist)
      return res.status(400).json({ status: 400, message: "code  not found " });
    const user = await User.findOne({ email: email });
    if (!codeExist.userId == user._id)
      return res
        .status(400)
        .json({ status: 400, message: "code is not for this email" });
    let newpassword = bcrypt.hashSync(password, 10);
    if (!newpassword)
      return res
        .status(400)
        .json({ status: 400, message: "password must be 8 character" });
    let updateUser = await User.findByIdAndUpdate(user._id, {
      password: newpassword
    });
    return res.json({ message: "password reset" });
  }
};
