const multer = require("multer");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./image/");
    },
    filename: function (req, file, cb) {
        
      cb(null, `${req.userId}.png`);
    },
  });
  let upload = multer({
    storage,
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

