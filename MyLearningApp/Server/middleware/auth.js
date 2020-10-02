const config=require("config")
const jwt=require("jsonwebtoken")

auth=(req,res,next)=>{
    const token = req.header("x-auth-token")
    
    if(!token) res.status(401).json({msg:"no authorisation"})

    try{
        const decoded = jwt.verify(token,config.get("jwtsecret"))  //returns payload value ie _ID in this case and assigns to decoded
        req.user = decoded;                                        // that id is stored in req.user
        next();                                                    //moves to the next middle ware
    }catch(e){
        res.status(400).json({msg:"invalid token"})

    }                                                  
}

module.exports=auth