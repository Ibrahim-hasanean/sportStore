module.exports= (items,userFav)=>{
    items = items.map(item=>{
        let isFav; 
        userFav.forEach(x=>{
            if(String(x.itemId) === String(item._id)) isFav = true;
            else isFav = isFav || false
        })
       
        return {item,fav:isFav}
    })
    return items
}