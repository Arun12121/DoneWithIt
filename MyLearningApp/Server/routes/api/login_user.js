const express=require('express');
const router=express.Router();
const config=require("config")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const auth = require("../../middleware/auth")

const User=require('../../model/usermodal')

/*******************************LOGIN USER AND GET TOKEN ********************************************/

router.post('/',function(req,res){

    const {email,password} = req.body; 

    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json({msg:"user does not exist"})

            bcrypt.compare(password,user.password)
                  .then(ismatch=>{
                        if(!ismatch) return res.status(400).json({msg:"invalid credentials"})
                        jwt.sign(
                            {id:user._id},                                                  //payload
                            config.get("jwtsecret"),                                        //secretkey
                            {expiresIn:3600},                                               //options : expire after 1 hour
                            (err,token)=>{                                                  //async callback functions
                                if (err) throw err
                                res.status(201).json({ token , user })
                            }                               
                        )

                  })   
        })
})


router.get('/user',auth,function(req,res){                    //PRIVATE ROUTE : To get the current user data 
    User.findById(req.user.id)
        .select("-password")
        .then(user=>{
            res.json({user})
        })
    
})

module.exports=router;