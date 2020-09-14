const nodemailer = require("nodemailer");
const createCode = require("crypto-random-string");
const codeModule = require("../models/code");
const User = require("../models/user");
require("dotenv").config();
const sgMail = require('@sendgrid/mail')
module.exports = async (to, subject) => {
  let code = createCode({ length: 4 });
  sgMail.setApiKey(process.env.SEND_GRID_KEY)  
  const msg = {
    to,
    from: process.env.EMAIL,
    subject,
    text: `your code`,
    html: `<strong>${code}</strong>`,
  }
  
  let info = await sgMail.send(msg)
  console.log(info)
  let setCode = await codeModule.create({ userId: to._id, code });
  return info;  

  console.log(e)
  // let transporter = nodemailer.createTransport({
  //   service: "Gmail",   
  //   auth: {
  //     user: process.env.TRANSPORT_EMAIL,
  //     pass: process.env.TRANSPORT_PASS
  //   }
  // });

  // let info = await transporter.sendMail({
  //   from: process.env.TRANSPORT_EMAIL,
  //   to: to.email,
  //   subject: subject,
  //   text: "your code: ",
  //   html: `<b>${code}</b>`
  // });

  
};
