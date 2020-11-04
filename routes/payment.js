const express = require("express");
const Router = express.Router(); 
const {createUserDetailes,createPaymentIntent,getpayments,getpaymentById} = require("../controller/payment")
const userDtailesValidator = require("../middleware/orderUserDetailesValidation")
Router.post("/payments/userDetailes",userDtailesValidator,createUserDetailes)
Router.post("/payments",createPaymentIntent)
Router.get("/payments",getpayments)
Router.get("/payments:id",getpaymentById)


module.exports= Router;