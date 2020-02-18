const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },

  email: {
    type: String
  },
  password: {
    type: String
  },
  googleId: { type: String },
  facebookId: { type: String }
});

userSchema.pre("save", function(next) {
  let user = this;
  if (user.password) user.password = bcrypt.hashSync(user.password, 10);
  next();
});

let userModel = mongoose.model("User", userSchema);
module.exports = userModel;
