const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    items:[{type:mongoose.Types.ObjectId}],
    userId:{
        type:mongoose.Types.ObjectId,        
    }
})
