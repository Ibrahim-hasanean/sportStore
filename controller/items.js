const Items = require("../models/items");
const admin = require("../config/firestore")
const firabseUpload = require("../utils/firsbaseImageUpload");
const isFavorit= require("../utils/getFavorite");
module.exports={
    createItem:async(req,res,next)=>{ 
             
        let {price,type,gender,category,team,discount,brand,season}= req.body;              
        if( !price || !type || !category || !team || !brand || !gender || !season){
            return res.status(400).json({status:400,message:"all fields required"})
        }        
       let {imagesURL,mainImage} = await firabseUpload(req.files)                
        let user = req.user;
        team=String(team).toLowerCase()   
        type=String(type).toLowerCase()   
        category=String(category).toLowerCase()   
        brand=String(brand).toLowerCase()   
        gender=String(gender).toLowerCase()
               
        let item = await Items.create({price,type,category,team,discount,userId:user._id,brand,imagesURL,mainImage,gender,season});        
        req.item=item;   
        return res.status(201).json({status:201,message:"item created",item})
    },  
    getItems:async(req,res,next)=>{
        let {team,category,type,brand,gender,season,search,price}=req.query; 
        let query ={}
        let userFav = req.user.favorit  
        let maxPrice;
        let minPrice;
        if(team){
            console.log(String(team).toUpperCase())
            query.team= String(team).toLowerCase()
        }        
        if(category) query.category= String(category).toLowerCase();
        if(gender) query.gender= String(gender).toLowerCase();
        if(season) query.season=  season
        if(brand) query.brand=  String(brand).toLowerCase();
        if(type) query.type =  String(type).toLowerCase();   
        if(price) {
            console.log(price)            
            price = price.split("-");
            price = price.filter(x=> !isNaN(x))   
            minPrice= price[0];
            maxPrice= price[1] || price[0]
            console.log(maxPrice,minPrice)  
            query.price=  {$gte:minPrice,$lte:maxPrice}    
        }     
        let {limit,skip} = req.query;      
        let {sortBy,orderBy}= req.query;   
        let sort = {};       
        if(sortBy){
            sort[sortBy]= orderBy === 'asc' ? 1 : -1
        }         
        if(search) {
            search = String(search).trim();         
            let regex = new RegExp(search,"i");       
            let items = await Items.find({ 
                $or:[
               {$or:[{team:regex},{team}]}, 
               {$or:[{category:regex},{category}]},
               {$or:[{brand:regex},{brand}]}, 
               {season:regex},                             
               {type:regex},
               {gender:regex},
               {price}
                ]
            }).sort(sort).skip(Number(skip)).limit(Number(limit)).select(['price','team','type','gender','season','mainImage','brand','category','discount'])  
            items = isFavorit(items,userFav)  
            return res.status(200).json({status:200,items})
        }
        console.log(query)                        
        let items = await Items.find({...query         
        }).sort(sort).skip(Number(skip)).limit(Number(limit)).select(['price','team','type','gender','season','mainImage','category','discount'])  
        items = isFavorit(items,userFav)                       
        return res.status(200).json({status:200,items})
    },
    getItemById:async(req,res,next)=>{
        let id = req.params.id
        let item = await Items.findById(id).select(['price','team','type','gender','season','imagesURL','mainImage','category','discount'])
        let userFav = req.user.favorit
        let isFav; 
        if(userFav.length === 0 ){
            return res.status(200).json({status:200,item:{...item._doc,fav:false}});
        }    
        userFav.forEach(x=>{
            if(String(x.itemId) === String(item._id)) isFav = true;
            else isFav = isFav || false
        })
        let returnedObj = {...item._doc,fav:isFav}
        return res.status(200).json({status:200,item:returnedObj})
    },
    home:async(req,res,next)=>{
        let userFav = req.user.favorit;               
        let popularItems = await Items.find({},null,{sort:{"likesNumber":-1}})
        .select(['price','team','type','gender','season','mainImage','likesNumber','category','discount']).limit(Number(15))
        let newItems = await Items.find({},null,{sort:{"createdAt":-1}})
        .select(['price','team','type','gender','season','mainImage','category','discount']).limit(Number(15))
        let sales=[]
        popularItems= isFavorit(popularItems,userFav);
        newItems= isFavorit(newItems,userFav);
        sales= isFavorit(sales,userFav);

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
    },    
    deleteItem:async(req,res)=>{
        let {id} = req.params
        await Items.deleteOne({_id:id})
        res.send("item deleted")
    }
}