const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const items = require('./routes/api/items')
const register_user = require('./routes/api/register_user')
const login_user = require('./routes/api/login_user')

const app=express();

app.use(express.json())

//const uri = "mongodb+srv://sharuhasan:ramesh54321@cluster0.2jvac.mongodb.net/Cluster0?retryWrites=true&w=majority";
//USED config.get("mongouri") instead

mongoose.connect(config.get("mongouri"),{ useNewUrlParser: true,useUnifiedTopology:true ,useCreateIndex:true})
        .then(()=>console.log('mongo connected..'))
        .catch(err=>{console.log(err)})

app.use('/api/items',items)
app.use('/api/register',register_user)
app.use('/api/login',login_user)

const port=process.env.PORT || 8000;
app.listen(port,()=>console.log(`server started on port ${port}`))