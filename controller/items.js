const Items = require("../models/items");

module.exports={
    createItem:async(req,res,next)=>{
        let {size,price,type,category,team,discount,likesNumber}= req.body;
        console.log(req.body)
        if(!size || !price || !type || !category || !team){
            return res.status(400).json({status:400,message:"all fields required"})
        }
        let user = req.user;       
        let item = await Items.create({size,price,type,category,team,discount,userId:user._id,likesNumber});        
        req.item=item;        
        
        return res.status(201).json({status:201,message:"item created",item,file:req.file})
    },
    getItems:async(req,res,next)=>{
        let {team,category,type,size}=req.query; 
        let query;
        if(team){
            query[team]=team
        }
        if(category) query[category]= category;
        if(type) query[type] = type
        if(size) query[size] = size            
        let {limit,skip} = req.query;      
        let {sortBy,orderBy}= req.query;    
        let sort = {};       
        if(sortBy){
            sort[sortBy]=req.query.orderBy === 'asc' ? 1 : -1
        }               
        let items = await Items.find({...query})
        return res.status(200).json({status:200,items})
    },
    getItemById:async(req,res,next)=>{
        let id = req.params.id
        let item = await Items.findById(id);
        return res.status(200).json({status:200,item})
    },
    home:async(req,res,next)=>{
        let popularItems = await Items.find({},null,{sort:{"likesNumber":-1},limit:15});
        let newItems = await Items.find({},null,{sort:{"createdAt":-1},limit:15});
        let sales=[]
        res.status(200).json({status:200,popular:popularItems,new:newItems,sales})
        }

}