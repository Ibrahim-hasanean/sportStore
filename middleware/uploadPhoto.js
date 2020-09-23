const multer = require("multer");
const path = require("path")
  let upload = multer({
    storage: multer.memoryStorage(),
    fileFilter:(req,file,cb)=>{
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      }else{
        cb(null, false);
        return cb('Only .png, .jpg and .jpeg format allowed!');
      }
    },
    dest: "image",
    limits: { fileSize: 1000000000 },
  });

module.exports = upload