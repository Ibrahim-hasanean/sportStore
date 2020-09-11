const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
let axios = require("axios");
const { exists } = require("../models/user");
module.exports = {
  facebookLogin: async (req, res, next) => {
    let {accessToken} = req.body;    
    let facebookAuth = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name,gender,picture`)
    console.log(facebookAuth.data);
    let userData = facebookAuth.data;    
    let ExistUser = await User.findOne({ email: userData.email });
    if(ExistUser){
    if (ExistUser.password)
      return res.status(409).json({
        status: 409,
        message: "you already signed up using local signed up"
      });
    
      let userToken = jwt.sign({ userId: ExistUser._id }, process.env.JWT_KEY, {
        expiresIn: "1h"
      });
      return res.json({
        status: 200,
        message: "facebook login success",
        token: userToken,
        email:ExistUser.email,
        name:ExistUser.name
      });    
  }
    let newUser = await User.create({
      name: userData.name,
      email: userData.email,
      facebookId: userData.id,
      verified: true
    });
    let userToken = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.json({
      status: 200,
      message: "facebook login success",
      token: userToken,
      email:newUser.email,
      name:newUser.name
    });
  },
  googleLogin: async (req, res, next) => {
    let {id_token} = req.body
    console.log(id_token);
    let googleAuth = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)     
    let userData = googleAuth.data;  
    let ExistUser = await User.findOne({ email: userData.email });
    if(ExistUser){
    if (ExistUser.password)
      return res.status(409).json({
        status: 409,
        message: "you already signed up using local signed up"
      });
    if (ExistUser) {
      let userToken = jwt.sign({ userId: ExistUser._id }, process.env.JWT_KEY, {
        expiresIn: "1h"
      });
      return res.json({
        status: 200,
        message: "google login success",
        token: userToken,
        email:ExistUser.email,
        name:ExistUser.name
      });
    }
  }
    let newUser = await User.create({
      name: userData.name,
      email: userData.email,
      googleId: userData.kid,
      verified: true
    });
    console.log(newUser);
    let userToken = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
    res.json({
      status: 200,
      message: "google login success",
      token: userToken,
      email:newUser.email,
      name:newUser.name
    });
  }
};
