import express from "express"
import { getfandf, like, login, signup, userinfo } from "../controllers/usercontroller.js";
import { authmiddelware } from "../../middelware/authmiddelware.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { usermodel } from "../models/usermodel.js";
import { memiddelware } from "../../middelware/memiddelware.js";

const router=express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/like/:id",authmiddelware,like)

router.get("/userinfo",authmiddelware,userinfo);

router.get("/getfandf",authmiddelware,getfandf);

router.get("/me",authmiddelware,async (req,res,next)=>{
    try {
        if(!req.user){
            return res.status(201).json(
                new Apiresponse(201,{},"user isn't loggedin")
            )
        }
        const user=await usermodel.findOne({_id:req.user._id});
        if(!user){
            return res.status(201).json(
                new Apiresponse(201,{},"user isn't loggedin")
            )
        }
        res.status(200)
        .json(
            new Apiresponse(200,user,"user is logged in")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/logout",async(req,res,next)=>{
    try {
        res.status(200)
        .clearCookie("token")
        .json(
            new Apiresponse(200,{},"user logged out succesfully")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export default router;