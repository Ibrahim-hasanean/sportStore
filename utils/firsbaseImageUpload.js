const admin = require("../config/firestore")
module.exports=async (files)=>{
    let imagesURL =  []   
    console.log(files)
    let main = files.main[0];
    let mainName = Date.now().toString()+ main.originalname
    let result =  await admin.storage().bucket().file(mainName)
    await result.createWriteStream().end(main.buffer)  
    let images = await result.getSignedUrl({action: 'read', expires: "03-09-2491"})
    let imageURL = images[0]   
    console.log(imageURL)  
   let mainImage = imageURL
    let others = files.photos
    for(let i=0;i<others.length;i++){
        let file = others[i];        
        let fileName =Date.now().toString()+ file.originalname        
        let result =  await admin.storage().bucket().file(fileName)
        await result.createWriteStream().end(file.buffer)  
        let images = await result.getSignedUrl({action: 'read', expires: "03-09-2491"})
        let imageURL = images[0]   
        console.log(imageURL)  
        imagesURL.push({imageURL}); 
        } 
console.log(imagesURL)
return {imagesURL,mainImage}      
}

//     files.forEach(async file=>{
//     let fileName =Date.now().toString()+ file.originalname
//     let result =  await admin.storage().bucket().file(fileName)
//     await result.createWriteStream().end(file.buffer)  
//     let images = await result.getSignedUrl({action: 'read', expires: "03-09-2491"})
//     let imageURL = images[0]   
//     console.log(imageURL)  
//     imagesURL.push({imageURL});  
// })