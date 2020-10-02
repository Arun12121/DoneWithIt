const { text } = require("body-parser");
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const Itemmodel = new Schema({
    name:{type:String,required:true},
    images:{},
    category:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true}
})

module.exports=mongoose.model("item",Itemmodel)