var express = require("express");
var Router = express.Router();
let Items = require("../models/items")
let {home,getItems,getItemById,addTofavorite,getFavorites,removeFavorite} = require("../controller/items")


Router.get("/items/home",home)

//Router.post("/items",createItem)
Router.get("/items",getItems)
Router.get("/items/:id",getItemById)
Router.post("/favorite",addTofavorite)
Router.get("/favorite",getFavorites)   
Router.delete("/favorite/:id",removeFavorite)
Router.delete("/items/:id",async(req,res)=>{
    let result= await Items.deleteOne({_id:req.params.id});
    console.log(result)
    res.send("delete")
})
module.exports= Router;