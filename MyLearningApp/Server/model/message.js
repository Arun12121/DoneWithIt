const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const Message = new Schema({
    recieverId:{type:String,required:true},
    senderId:{type:String,required:true},
    message:{type:String,required:true},
})

module.exports=mongoose.model("Message",Message)