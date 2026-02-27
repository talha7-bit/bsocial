import jwt from "jsonwebtoken"
import { usermodel } from "../src/models/usermodel.js";

export const memiddelware=async(req,res,next)=>{
    try {
    const token=req.cookies?.token;
    if(!token){
        req.user=null;
        return next();
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await usermodel.findById(decoded.id);
    if(!user){
        req.user=null;
        return next();
    }
    req.user=user;
    next();
    } catch (error) {
        req.user=null;
        next();
    }
}