const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleId: { type: String }
});

userSchema.pre("save", function(next) {
  let user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

let userModel = mongoose.model("User", userSchema);
module.exports = userModel;
