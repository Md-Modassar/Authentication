const { default: mongoose } = require('mongoose')
const usermode=require('../models/usermodel')
const jwt=require('jsonwebtoken')
const objectid=mongoose.Types.ObjectId
exports.authenticate=async (req,res,next)=>{
    try{let userid=req.params.userid

    if(!objectid.isValid(userid))
       return res.status(400).send({status:false,msg:"Please enter valide userid"})

     let useridexist=await usermode.findById(userid)
      if(!useridexist)
        return res.status(404).send({status:false,msg:"this userid is not exist"})  

        const token = req.headers["x-api-key"]

        if (!token) {
            res.status(400).send({ msg: "Please set x-api-key header" })
        }  
      jwt.verify(token,"this is my key",(err,decode)=>{
      if(err)
        return res.status(400).send({status:false,msg:"Invalide token"})
        if(decode)
          next();
    })
  }catch(err)
    {
      return res.status(500).send({status:false,msg:err})
    }
}