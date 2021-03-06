var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let itemsRouter = require("./routes/items");
const paymentRoutes = require("./routes/payment")
const bodyParser = require("body-parser")
const upload = require("./middleware/uploadPhoto")
const admin = require("./config/firestore")
const googleStorage= require("@google-cloud/storage")
var app = express();
const adminAuth= require("./middleware/adminAuth")
const adminRoutes = require("./routes/admin")
const cors = require("cors");
const validate = require("./middleware/validator");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qnafb.mongodb.net/sport-store?retryWrites=true&w=majority`,
  {useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{console.log("mogoose connected");}).catch(
  error => {
    if (error) console.log(error);
    else console.log("mongoose connect");
  }
)
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json())
app.post('/upload',upload.single("photo"),async (req,res)=>{
  console.log(req.file)
  let fileName =Date.now().toString()+ req.file.originalname
   let result =  await admin.storage().bucket().file(fileName)
   await result.createWriteStream().end(req.files)  
   let url = await result.getSignedUrl({action: 'read', expires: "2-2-3022",})
   console.log(url)
   //createWriteStream().end(req.file.buffer)
 // console.log(url)
   
  res.send("done")
})
app.get("/images",(req,res,next)=>{
  res.sendFile(__dirname + `/image/${req.body.image}`)
})
app.use("/api/v1/", indexRouter);
app.get("/test", (req, res) => {
  res.send("test success");
});
app.use("/api/v1/users", validate, usersRouter);
app.use("/api/v1/", validate, itemsRouter);
app.use("/api/v1/admin",validate,adminAuth,adminRoutes)
app.use("/api/v1/",validate,paymentRoutes)
app.listen(port, () => {
  console.log("listen on 3000");
});
module.exports = app;
