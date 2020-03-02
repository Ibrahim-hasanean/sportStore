const User = require("../models/user");
const validator = require("validator");

module.exports = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email }),
    password = req.body.password;
  if (user) {
    if (user.facebookId)
      return res.status(409).json({
        status: 409,
        message: "email is already signed up using facebook authentication"
      });
    if (user.googleId)
      return res.status(409).json({
        status: 409,
        message: "email is already signed up using google authentication"
      });
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
  next();
};
