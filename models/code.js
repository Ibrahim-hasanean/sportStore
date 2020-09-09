const mongoose = require("mongoose");

let codeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  code: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
  confirmed:{type:Boolean,default:false}
});

const code = mongoose.model("Code", codeSchema);
module.exports = code;
