const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function validator(req, res, next) {
  let token = String(req.cookies.access_token).split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
    if (err)
      return res.json({ status: "error", message: err.message, data: null });

    //  console.log(decode);
    let user = await User.findById(decode.userId);

    req.body.user = user;
    next();
  });
}
/*
async function validator(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_KEY,
    (err, decode) => {
      if (err) res.json({ status: "error", message: err.message, data: null });
      let user = await User.findById(decode.id);  
      req.body.user = user;
      next();
    }
  );
}*/

module.exports = validator;
