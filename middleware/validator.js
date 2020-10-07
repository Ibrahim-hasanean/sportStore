const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
/*
async function validator(req, res, next) {
  let token = String(req.cookies.access_token).split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
    if (err)
      return res.json({ status: "error", message: err.message, data: null });

    //  console.log(decode);
    let user = await User.findById(decode.userId);
    if (!user) {
      res.status(400);
      return res.json({ status: 400, message: "must sign up" });
    }
    if (!user.verified) {
      res.status(400);
      return res.json({ status: 400, message: "email is not verified" });
    }
    req.body.user = user;
    next();
  });
}
*/
async function validator(req, res, next) {
  console.log(req.headers["x-access-token"])

  if (!req.headers["x-access-token"])
    return res.status(400).json({ status: 400, message: "token must be provided" });

  jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_KEY,
    async (err, decode) => {
      if (err) {
        return res.status(401).json({status:401,message:"unauthurized"})
      }
      let user = await User.findById(decode.userId);      
      req.user=user;              
      // if (!user.verified) {
      //   res.status(400);
      //   return res.json({ status: 400, message: "email is not verified" });
      // }
      next();
    }
  );
}

module.exports = validator;
