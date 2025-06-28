import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async(req,res,next) =>{
    const token = req.headers.authorization
  

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user=  await User.findById(decoded?.id).select("-password")
        
        req.user = user;
        // jwt.verify(token , process.env.JWT_SECRET)
        next();

    }catch(error){
        res.json({success:false,message:"invalid token"})

    }
}

export default auth