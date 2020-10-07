module.exports= (items,userFav)=>{
    items = items.map(item=>{
        let isFav; 
        console.log(userFav)    
        if(userFav.length === 0 ){
            return {...item._doc,fav:false}
        }    
        userFav.forEach(x=>{
            if(String(x.itemId) === String(item._id)) isFav = true;
            else isFav = isFav || false
        })  
        return {...item._doc,fav:isFav}
    })
    return items
}