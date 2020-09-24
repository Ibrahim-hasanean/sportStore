var express = require("express");
var Router = express.Router();
let upload = require("../middleware/uploadPhoto")
let {createItem} = require("../controller/items")
Router.get("/isAdmin",(req,res,next)=>{
    res.send(true)
})
Router.post("/items",upload.fields([{name:"main",maxCount:1},{name:"photos"}]),createItem) 
module.exports = Router;
