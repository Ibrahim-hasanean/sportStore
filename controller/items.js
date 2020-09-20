const Items = require("../models/items");

module.exports={
    createItem:async(req,res,next)=>{
        let {size,price,type,category,team,discount,likesNumber,brand}= req.body;
        console.log(req.body)
        if(!size || !price || !type || !category || !team || !brand){
            return res.status(400).json({status:400,message:"all fields required"})
        }
        let user = req.user;       
        let item = await Items.create({size,price,type,category,team,discount,userId:user._id,likesNumber,brand,imageURL:req.file.path});        
        req.item=item;   
        return res.status(201).json({status:201,message:"item created",item})
    },  
    getItems:async(req,res,next)=>{
        let {team,category,type,size,brand}=req.query; 
        let query ={}
        if(team){
            query.team=team
        }
        if(category) query.category= category;
        if(brand) query.brand= brand;
        if(type) query.type = type
        if(size) query.size = size            
        let {limit,skip} = req.query;      
        let {sortBy,orderBy}= req.query;    
        let sort = {};       
        if(sortBy){
            sort[sortBy]= orderBy === 'asc' ? 1 : -1
        }               
        let items = await Items.find({...query}).sort(sort).skip(Number(skip)).limit(Number(limit))
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
        },
    addTofavorite:async(req,res,next)=>{
        let {itemId} = req.body; 
        let user = req.user;
        let item = await Items.findOne({_id:itemId});
        let favoites= user.favorit.filter(x=>x.itemId == itemId)               
        if(favoites.length > 0 ){
            return res.status(409).json({status:409,message:"item already added to yor favorite"})
        }
        user.favorit.push({itemId});
        item.likesNumber++;
        user.save();
        item.save();
        console.log(user)
        console.log(item)
        res.status(200).json({status:200,message:"item added to favorite"})

        },
    getFavorites:async(req,res)=>{
        let favorit = req.user.favorit;    
        console.log(favorit)     
        let favorites=[]
        for(let i=0;i<favorit.length;i++){
            let f = favorit[i];
            let fav = await Items.findById(f.itemId)
            favorites.push(fav)
        }
       
       res.send(favorites)
    },
    removeFavorite:async(req,res)=>{
        let itemId= req.params.id;
        let user = req.user;
        let filter = []
        user.favorit.forEach(async fav => {
            if(fav.itemId != itemId ){
                filter.push(fav)
            }else{
                try{
                let item = await Items.findById(itemId);
                item.likesNumber = item.likesNumber-1
                item.save()}
                catch(e){
                    console.log(e)
                }
            }
        });
        console.log(filter)
        user.favorit=filter;
        user.save()
        return res.status(200).json({status:200,message:"removed from favorite"})
    }

}