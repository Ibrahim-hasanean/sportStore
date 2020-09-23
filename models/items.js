const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imagesSchema = new Schema({imageName:{type:String,default:"others"},imageURL:{type:String}})
const itemSchema = new Schema({
    category:{type:String,required:true},
    size:{type:String,required:true},
    price:{type:Number,required:true},
    type:{type:String,required:true},   
    gender:{type:String,required:true},
    team:{type:String,required:true},
    brand:{type:String},
    discount:{type:Number,max:1},
    userId:{type:String,required:true},
    imageURL:[imagesSchema],
    likesNumber:{type:Number,default:0,min:0},
    salesTimes:{type:Number,default:0},
    season:{type:String,default:0},    
},{timestamps:true})
let Item = mongoose.model("Items",itemSchema)

module.exports=Item;

