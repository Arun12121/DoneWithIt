const express=require('express');
const router=express.Router();
const auth = require("../../middleware/auth")
const fs = require('fs')
const path =require("path")

const Item=require('../../model/itemmodal')

router.get('/',function(req,res){
    Item.find()
        .then(items=>res.json(items))
})

router.post('/',auth,function(req,res){                                                   //PRIVATE ROUTE : by adding middleware auth
    const newitem=Item(
        {
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description
        })
    Item.image.data=fs.readFileSync(req.body.imgPath);
    Item.image.contentType=path.extname(req.body.imgPath)

    newitem.save().then((item)=>res.json(item))
})

router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
        .then(item=>item.remove().then(()=>res.send(`item deleted with id = ${req.params.id} `)))
        .catch(err=>res.status(404).json("ID doesnt exist"))

})
module.exports=router;