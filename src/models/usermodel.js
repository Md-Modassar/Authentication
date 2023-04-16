const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    gender:{type:String,required:true,enum:['male','female','other']},
    email:{type:String,required:true,unique:true},
    password:{type:String,require:true},
    mobileNo:{type:String,required:true,unique:true}

},{timesetamps:true})

module.exports=mongoose.model('user',userschema)