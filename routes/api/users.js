const express = require("express");
const { findOne } = require("../../models/user");
let router = express.Router();
let User = require('../../models/user');
const config =require('config');
const _ =require("lodash");
var bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
router.post('/register',async(req,res)=>{
    let user =await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("user with email already exists");
    user = new User();
    user.name = req.body.name;
    user.email=req.body.email;
    user.password =req.body.password;
    let salt =await  bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    let token =jwt.sign({_id: user._id,name:user.name,role:user.role},
        config.get("jwtPrivateKey")
        );
   let datatoreturn  ={
       name:user.name,
       email:user.email,
       token
   }
    return res.send(datatoreturn);
});
router.post("/login",async (req,res)=>{
    let user =await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("User Not Registered");
    let isValid = await bcrypt.compare(req.body.password,user.password);
    if(!isValid) return res.status(401).send("in valid password");
    let token =jwt.sign({_id: user._id,name:user.name,role:user.role},
        config.get("jwtPrivateKey")
        );
    console.log(token);
    res.send(token);
});
router.get('/',async (req,res)=>{
    let users = await User.find();
    res.send(users);
});

module.exports = router;
