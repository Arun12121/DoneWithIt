const express=require('express');
const router=express.Router();
const auth = require("../../middleware/auth");

const Message = require('../../model/message');

router.get('/sent', auth, function(req,res){
    Message.find({senderId: req.user.id})
        .then(messages => {
            res.status(200).json(messages);
        });
});

router.get('/recieved', auth, function(req,res){
    Message.find({recieverId: req.user.id})
        .then(messages => {
            res.status(200).json(messages);
        });
});

router.post('/',auth,function(req,res){
    const message=Message(
        {
            senderId: req.user.id,
            recieverId: req.body.to,
            message: req.body.message
        });
    message.save().then((message)=>res.status(200).json(message))
});

module.exports=router;