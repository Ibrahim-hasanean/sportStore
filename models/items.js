const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{type:String,required:true},
    size:{type:String,required:true},
    price:{type:Number,required:true},
    filter:{type:String,required:true},
    categoryId:{type:Number,required:true}
})
let Item = mongoose.model("Items",itemSchema)

module.exports=Item;

