const express=require('express');
const { createuser, login, getuser } = require('../controller.js/usercontroller');
const { authenticate } = require('../middelware/authentication');
const router=express.Router();


router.post("/user",createuser)
router.post('/login',login)
router.get('/getuser/:userid',authenticate,getuser)

module.exports=router