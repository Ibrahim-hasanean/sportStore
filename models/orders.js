const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemsSchema = new Schema({
        itemId:{type:mongoose.Types.ObjectId},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true},
        discount:{type:Number},
        season:{type:String},
        category:{type:String},
        type:{type:String},
        size:{type:String},
        team:{type:String},
        playerName:{type:String},
        mainImage:{type:String}
    })
const ordersSchema = new Schema({
    items:[itemsSchema],
    userId:{
        type:mongoose.Types.ObjectId, 
        required:true       
    },
    paymentIntentId:{
        type: String,   
        unique:true
    },
    totalAmount:{
        type:Number,
        required:true        
    },    
    orderUserDetailesId:{
        type:mongoose.Types.ObjectId,   
        required:true 
    }
    
},{timestamps:true})
let Order = mongoose.model("Order",ordersSchema)
module.exports= Order;