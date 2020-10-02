const express=require('express');
const router=express.Router();
const bcrypt = require("bcryptjs") 
const jwt =require("jsonwebtoken")
const config = require("config")

const User=require('../../model/usermodal')



/*********************************************REGISTER USER AND GET TOKEN *******************************************************************/

router.post('/',function(req,res){
    
    const {name,email,password} = req.body;                                                      // const newuser = new User( { name : req.body.name , email : req.body.email , password : req.body.password})
                                                                                                //////////////// ALITER using destructuring ////////////////////                                        
    User.findOne({email})
        .then(user=>{
            if(user) return res.status(400).json({msg:"user already exists"})
            const newuser =new User({name,email,password})
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newuser.password, salt, function(err, hash) {
                    newuser.password=hash;
                    newuser.save().then( user=>{ 
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
                });
            });
        })
})



module.exports=router;








// router.get('/',function(req,res){
//     User.find()
//         .sort({date:-1})
//         .then(users=>res.json(users))
// })


// router.delete('/:id',(req,res)=>{
//     User.findById(req.params.id)
//         .then(user=>user.remove().then(()=>res.send(`item deleted with id = ${req.params.id} `)))
//         .catch(err=>res.status(404).json("ID doesnt exist"))

// })