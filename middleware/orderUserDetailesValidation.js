const validator = require("validator")
module.exports=(req,res,next)=>{
    let {email, phoneNumber,fullName,country,state,city,pistalCode} = req.body;
    if(!email || !phoneNumber || !fullName || !country || !state || !city || !pistalCode ){
        return res.status(400).json({status:400 , message:"all fields required"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({status:400 , message:"email not valid"});
    }
    if(isNaN(phoneNumber)){
        return res.status(400).json({status:400 , message:"phone number not valid"});
    }
    next()
}