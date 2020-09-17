const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    category:{type:String,required:true},
    size:{type:String,required:true},
    price:{type:Number,required:true},
    type:{type:String,required:true},   
    team:{type:String,required:true},
    discount:{type:Number,max:1},
    userId:{type:String,required:true},
    img_url:{type:Number},
    likesNumber:{type:Number,default:0}

},{timestamps:true})
let Item = mongoose.model("Items",itemSchema)

module.exports=Item;

