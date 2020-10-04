const express=require('express');
const config = require("config")
const router=express.Router();
const auth = require("../../middleware/auth")
const fs = require('fs')
const path =require("path")
const multer =require("multer")
const GridfsStorage = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const mongoose =require("mongoose")

const Item=require('../../model/itemmodal')

// router.get('/',function(req,res){
//     Item.find()
//         .then(items=>res.json(items))
// })

// router.post('/',auth,function(req,res){                                                   //PRIVATE ROUTE : by adding middleware auth
//     const newitem=Item(
//         {
//         name:req.body.name,
//         category:req.body.category,
//         price:req.body.price,
//         description:req.body.description
//         })
//     Item.image.data=fs.readFileSync(req.body.imgPath);
//     Item.image.contentType=path.extname(req.body.imgPath)

//     newitem.save().then((item)=>res.json(item))
// })

// router.delete('/:id',(req,res)=>{
//     Item.findById(req.params.id)
//         .then(item=>item.remove().then(()=>res.send(`item deleted with id = ${req.params.id} `)))
//         .catch(err=>res.status(404).json("ID doesnt exist"))

// })
// module.exports=router;


const conn = mongoose.createConnection(config.get("mongoURI"),{ useNewUrlParser: true,useUnifiedTopology:true ,useCreateIndex:true})
let gfs;
conn.once("open",()=>{
   gfs = new mongoose.mongo.GridFSBucket(conn.db,{ bucketName: "item_images"})
})

var storage = new GridFsStorage({
    url: config.get("mongoURI"),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "item_images"
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const fileFilter=(req,res,cb)=>{
    if(file.mimetype==="image/jpeg"||file.mimetype==="image/jpeg") {
        cb(null,true)
    }
    else{
        cb(new Error("Image should be of format jpeg or png"),false)
    }
  }
  const upload = multer({ storage,fileFilter });

  
router.post("/upload",upload.single(file),(req,res)=>{
    const newitem=Item(
        {
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        description:req.body.description,
        imagename:req.file.filename
        })

    newitem.save().then((item)=>res.json(item))  
})

router.get("/display_items",(req,res)=>{
    Item.find()
        .then(
            items.map(item=>{
                gfs.files.findOne({filename:item.imageID},(err,file)=>{
                    if(!file||file.length===0) return res.status(404).json({err:"item image no exists"})
                    
                    return res.json(file)
                })
                res.json({name:item.name,category:item.category,price:item.price,description:item.description})
                
            })
        )
})