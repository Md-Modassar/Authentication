const express=require('express')
const mongoose=require('mongoose');
const route=require('./route/route')
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',route)
mongoose.connect("mongodb+srv://modassar123:modassar1234@test.ahxnnau.mongodb.net/bonseproject-database",{
    useNewUrlParser:true},mongoose.set('strictQuery',false))
    .then(()=>console.log("mongoose connected"))
    .catch((err)=>console.log(err))

    app.listen(process.env.PORT||3000,function(){
        console.log("express app running on PORT"+" "+(process.env.PORT || 3000))
    })
