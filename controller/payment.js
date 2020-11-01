const orderUserDetailes = require("../models/orderUserDetails");
const Order = require("../models/orders");
const Items = require("../models/items")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const orderItemsCheck = require("../utils/orderItemsCheck")
module.exports={
    createUserDetailes:async (req,res)=>{
        let {email, phoneNumber,fullName,country,state,city,postalCode} = req.body;
        let {user} = req;       
        console.log(user)
        try {
            let userDetailes = await orderUserDetailes.create({userId:user._id,orderEamil:email,phone:phoneNumber,fullName,country,state,city,postalCode})
            res.status(201).json({status:201,userDetailes})
        } catch (e) {
            console.log(e)
            res.status(500).json({status:500,message:"smth wrong"})
        }    
    },
    createPayment:async (req,res)=>{
        const {amount,source,items, userDetailesId} = req.body; 
        let {user} = req;             
        if(isNaN(amount)){
            return res.status(400).json({status:400,message:"amiunt must be number"})
        }        
        try{
        let {totalAmount,orderItems} =await orderItemsCheck(items)   
        console.log(totalAmount)         
        if(totalAmount != amount){
            throw new Error("items total price not true check price and discount")
        }
        let order = new Order({items:orderItems,userId:user._id,totalAmount,orderUserDetailesId:userDetailesId})
        const charge = await stripe.charges.create({
            amount:amount*100,
            currency: 'usd',
            source,
            description: `kstore payment for order ${order._id}`,
          });
          order.chargeId = charge.id;         
          order.save();
          res.status(200).json({status:200,message:"payemnt successfull"})
        }catch(e){
            console.log(e);                      
            return  res.status(400).json({status:400,message:e.message});               
          }
    },
    getpayments: async(req,res)=>{
        let {user} = req;
        console.log(user)
        let orders = await Order.find({userId:user._id});
        res.status(200).json({status:200,orders})
    },
    getpaymentById: async(req,res)=>{
        let orderId = req.params.id;        
        let order = await Order.find({_id:orderId});
        res.status(200).json({status:200,order})
    }
}