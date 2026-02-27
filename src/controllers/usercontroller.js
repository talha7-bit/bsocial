import { followermodel } from "../models/followermodel.js";
import { postmodel } from "../models/postmodel.js";
import { usermodel } from "../models/usermodel.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signup=async(req,res,next)=>{
    try {
    const {name,email,password,image}=req.body;
    if(!email || !password || !name){
        throw new Apierror(400,"all fields are required");
    }
    const existed=await usermodel.findOne({email});
    if(existed){
        throw new Apierror(400,"user already exist");
    }
    const user=await usermodel.create({
        name,
        email,
        password,
        image
    });
    if(!user){
        throw new Apierror(400,"an error occured while creating the user");
    }
    res.status(200)
    .json(
        new Apiresponse(200,user,"user created succesfully")
    )
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const login=async(req,res,next)=>{
    try {
       const {email,password}=req.body;
       if(!email || !password){
        throw new Apierror(400,"both fields are required");
       }
       const existed=await usermodel.findOne({email});
       if(!existed){
        throw new Apierror(400,"user didn't exist");
       }
       const result=await bcrypt.compare(password,existed.password);
       if(!result){
        throw new Apierror(400,"wrong email or password");
       }
       const token=jwt.sign({id:existed._id},process.env.JWT_SECRET);
       if(!token){
        throw new Apierror(400,"an error occured while assigning token");
       }      
       res.status(200)
       .cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
       })
       .json(
        new Apiresponse(200,existed,"user logged in succesfully")
       )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const like=async(req,res,next)=>{
    try {
        if(!req.user){
            throw new Apierror(400,"please logihn first");
        }
        const {id}=req.params;
        const post=await postmodel.findOne({_id:id});
        if(!post){
            throw new Apierror(400,"post din't exist");
        }
        const alreadyliked=post.likes.includes(req.user._id);
        const updatepost=await postmodel.findByIdAndUpdate(id,alreadyliked ? { $pull : {likes : req.user._id}}: {$addToSet:{likes:req.user._id}},{returnDocument:"after"});
        const totallikes=updatepost.likes.length;
        res.status(200)
        .json(
            new Apiresponse(200,totallikes,"likes updated succesfully")
        )
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const userinfo=async(req,res,next)=>{
    try {
      if(!req.user){
        throw new Apierror(400,"please login first");
      }  
      const user=await usermodel.findOne({_id:req.user._id});
      if(!user){
        throw new Apierror(400,"user not found");
      }
      res.status(200)
      .json(
        new Apiresponse(200,user,"user fetched succesfully")
      )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const getfandf=async(req,res,next)=>{
    try {
       if(!req.user){
        throw new Apierror(400,"please login first");
       } 
       const followers=await followermodel.find({receiver:req.user._id});
       const following=await followermodel.find({sender:req.user._id});
       res.status(200)
       .json(
        new Apiresponse(200,{followers,following},"followers and followinf list fetched succesfully")
       )
    } catch (error) {
        console.log(error);
        next(error);
    }
}