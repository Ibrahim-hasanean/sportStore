const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const favoritSchema = new Schema({itemId:{type:mongoose.Types.ObjectId,unique:true}})
const userSchema = new Schema({
  name: { type: String, require: true },
  email: {
    required: true,
    type: String
  },
  password: {
    type: String
  },
  googleId: { type: String },
  facebookId: { type: String },
  address: String,
  verified: { type: Boolean, default: false },
  favorit:[favoritSchema],
  isAdmin:{type:Boolean,default:false}
});

userSchema.pre("save", function(next) {
  let user = this;
  if (user.password) user.password = bcrypt.hashSync(user.password, 10);
  next();
});

let userModel = mongoose.model("User", userSchema);
module.exports = userModel;
