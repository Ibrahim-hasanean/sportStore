const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
  facebookLogin: async (req, res, next) => {
    let userData = req.body.userData;
    let ExistUser = await User.find({ email: userData.email });
    if (ExistUser.length > 0) {
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
    let userToken = jwt.sign({ userId: "asdasd" }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.json({
      status: 200,
      message: "facebook login success",
      token: userToken
    });
  },
  googleLogin: async (req, res, next) => {
    let userData = req.body.userData;
    let ExistUser = await User.find({ email: userData.email });
    if (ExistUser) {
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
  }
};
