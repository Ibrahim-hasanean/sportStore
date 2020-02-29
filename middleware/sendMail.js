const nodemailer = require("nodemailer");
const createCode = require("crypto-random-string");
const codeModule = require("../models/code");
const User = require("../models/user");
require("dotenv").config();
module.exports = async (to, subject) => {
  let code = createCode({ length: 4 });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASS
    }
  });

  let info = await transporter.sendMail({
    from: process.env.TRANSPORT_EMAIL,
    to: to.email,
    subject: subject,
    text: "your code: ",
    html: `<b>${code}</b>`
  });

  let setCode = await codeModule.create({ userId: to._id, code });
  return info;
};
