var express = require("express");
var Router = express.Router();
const multer = require("multer");
const path = require("path")
let {home,createItem,getItems,getItemById,addTofavorite,getFavorites,removeFavorite} = require("../controller/items")
let upload = require("../middleware/uploadPhoto")
Router.get("/items/home",home)
Router.post("/items",upload.single("photo"),createItem) 
//Router.post("/items",createItem)
Router.get("/items",getItems)
Router.get("/items/:id",getItemById)
Router.post("/favorite",addTofavorite)
Router.get("/favorite",getFavorites)   
Router.delete("/favorite/:id",removeFavorite)
module.exports= Router;