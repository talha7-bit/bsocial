import { usermodel } from "../src/models/usermodel.js";
import { Apierror } from "../src/utils/Apierror.js";
import jwt from "jsonwebtoken"

export const authmiddelware=async(req,res,next)=>{
    try {
        const token=req.cookies?.token;
        if(!token){
            req.user=null;
            return next();
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await usermodel.findOne({_id:decoded.id});
        if(!user){
            req.user=null;
            return next();
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}