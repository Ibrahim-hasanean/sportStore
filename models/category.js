const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{type:String,required:true},    
})

let Category = mongoose.model("category",categorySchema);