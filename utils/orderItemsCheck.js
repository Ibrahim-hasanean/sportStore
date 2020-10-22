const Items = require("../models/items")
module.exports=async (items)=>{
    let totalAmount=0;
   let  orderItems =[]
        for(let i =0; i< items.length; i++){ 
            let getItem;
            try{     
             getItem = await Items.findById(items[i].itemId)
            }catch(e){
                throw new Error("not all items avaliable")
            }
        if(!getItem){
            throw new Error("not all items avaliable")
        }
        let itemDiscount = items[i].discount || 1;
        if((items[i].price !== getItem.price)|| (items[i].discount !== getItem.discount)){
           throw new Error("items data not true check price and discount")
        }            
        totalAmount = totalAmount + (items[i].price* itemDiscount * items[i].quantity);
        console.log(totalAmount)
        orderItems.push({
            itemId:items[i].itemId,
            quantity:items[i].quantity,
            price:items[i].price,
            discount:items[i].discount,
            mainImage:items[i].mainImage,
            season:items[i].season,
            type:items[i].type,
            size:items[i].size,
            category:items[i].category,
            team:items[i].team,
            playerName:items[i].playerName,        
        });
    } 
    return {totalAmount,orderItems}
}