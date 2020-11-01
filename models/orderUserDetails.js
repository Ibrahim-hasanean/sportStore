const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const orderUserDetailesSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    orderEamil:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    }, 
},{timestamps:true})

let orderUserDetailes = mongoose.model("orderUserDetailes",orderUserDetailesSchema)

module.exports=orderUserDetailes;
