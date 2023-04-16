const usermodel= require('../models/usermodel')
const jwt=require('jsonwebtoken')

exports.createuser=async (req,res)=>{
    try{
    let data=req.body
    if(!data.firstName)return res.status(400).send({status:false,msg:"please enter firstName"})
    if(!data.lastName)return res.status(400).send({status:false,msg:"please enter lastName"})
    if(!data.gender)return res.status(400).send({status:false,msg:"please enter gender"})
    if(!data.email)return res.status(400).send({status:false,msg:"please enter email"})
    if(!data.password)return res.status(400).send({status:false,msg:"please enter password"})
    if(!data.mobileNo)return res.status(400).send({status:false,msg:"please enter mobileNo"})

    if(!data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return res.status(400).send({status:false,msg:"Please enter valide emailid"})
       }
    if(!data.password.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$/)){
        return res.status(400).send({status:false,msg:"Please enter valide password"})
    }
    if(!data.mobileNo.match(/^[0-9]{10}$/))
       {
        return res.status(400).send({status:false,msg:"Please enter valide Mobile No."})
       }

       const email=await usermodel.findOne({email:data.email})
       if(email)
         return res.status(400).send({status:false,msg:"this email already exist"})
       const mobile=await usermodel.findOne({mobileNo:data.mobileNo})
        if(mobile)
          return res.status(400).send({status:false,msg:"this mobile no already exist"})
          
          const savedata=await usermodel.create(data)
          return res.status(201).send({status:true,msg:"create successfull",savedata})
    }catch(err){
        return res.status(500).send({status:false,msg:err})
    }
}

exports.login=async (req,res)=>{
   try{ let data=req.body

    if(!data.email)return res.status(400).send({status:false,msg:"Please email id"})
    if(!data.password)return res.status(400).send({status:false,msg:"Please enter password"})

    if(!data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return res.status(400).send({status:false,msg:"Please enter valide emailid"})
       }
    if(!data.password.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$/)){
        return res.status(400).send({status:false,msg:"Please enter valide password"})
    }
   
    const userdata=await usermodel.findOne({email:data.email,password:data.password})
    if(!userdata)return res.status(400).send({status:false,msg:"Please enter valide email and password"})

    const token=jwt.sign({
        userid:userdata._id
    },"this is my key")

   return res.status(201).send({status:true,msg:" successfull",token:token})  
}catch(err){
    return res.status(500).send({status:false,msg:err})
}  
}

 exports.getuser=async (req,res)=>{
    try{let userid=req.params.userid

    let data=await usermodel.findById(userid)

    return res.status(200).send({status:true,data:data})
    }catch(err)
      {
        return res.status(500).send({status:false,msg:err})
      }
}