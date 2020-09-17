var express = require("express");
var Router = express.Router();
const multer = require("multer");
const path = require("path")
let {home,createItem,getItems,getItemById} = require("../controller/items")

Router.get("/items/home",home)
Router.post("/items",createItem)
Router.get("/items",getItems)
Router.get("/items/:id",getItemById)
module.exports= Router;
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {       
//       cb(null,path.join(__dirname,'../image/'));
//     },
//     filename: function  (req, file, cb) {        
//       cb(null, req.item._id+".png");     
//     },
//   });
//   let upload = multer({
//     storage,
//     fileFilter:(req,file,cb)=>{     
      
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//       }else{
//         cb(null, false);
//         return cb('Only .png, .jpg and .jpeg format allowed!');
//       }
//     },
//     dest: "image",
//     limits: { fileSize: 1000000000 },
//   });


// Router.route("/items").post(createItem,upload.single("photo"), (req, res,next) => {
//     try {  
//       console.log(req.item)
//     return res.status(200).json({file:req.file,item:req.item});
//     } catch (e) {
//       console.log(e)
//       res.status(400).send(e)
//     }
//   })
