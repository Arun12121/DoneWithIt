const { text } = require("body-parser");
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

// const Itemmodel = new Schema({
//     name:{type:String,required:true},
//     image:{data:Buffer,contentType:String},
//     category:{type:String,required:true},
//     price:{type:String,required:true},
//     description:{type:String,required:true}
// })
const Itemmodel = new Schema({
    name:{type:String,required:true},
    imagename:{type:String},
    category:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true}
})

module.exports=mongoose.model("item",Itemmodel)