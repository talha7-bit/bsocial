import { followermodel } from "../models/followermodel.js";
import { postmodel } from "../models/postmodel.js";
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import {uploadoncloudinary} from "../utils/cloudinary.js"

export const post=async(req,res,next)=>{
    console.log(req.body);
    try {
        if(!req.user){
            throw new Apierror(400,"please login first");
        }
        const image=req.file?.path;
        const {caption}=req.body;
        if(!image){
            throw new Apierror(400,"image field is required");
        }
        const response=await uploadoncloudinary(image);
        if(!response){
           throw new Apierror(400,"an error occured while uploading on cloudinary")
        }
        const create=await postmodel.create({
            image:response.url,
            user:req.user._id,
            caption
        });
        if(!create){
            throw new Apierror(400,"an error occured while creating post");
        }
        res.status(200)
        .json(
            new Apiresponse(200,create,"post created succesfully")
        )
    } catch (error) {
    console.log(error);
     next(error);    
    }
}
export const deletep=async(req,res,next)=>{
    try {
        if(!req.user){
            throw new Apierror(400,"please login first");
        }
        const {id}=req.params;
        const post=await postmodel.findOneAndDelete({_id:id,user:req.user._id});
        res.status(200)
        .json(
            new Apiresponse(200,{},"post deleted succcesfully")
        )
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const getall=async(req,res,next)=>{
    try {
        if(!req.user){
            throw new Apierror(400,"please login first");
        }
        const posts=await postmodel.find({user:req.user._id});
        if(!posts || posts.length==0){
            throw new Apierror(400,"posts didn't exist");
        }
        res.status(200)
        .json(
            new Apiresponse(200,posts,"posts fetched succesfully")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const getallposts=async(req,res,next)=>{
    try {
        const posts=await postmodel.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"user",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {$unwind:{path:"$user"}},
            {
                $project:{
                   _id:1,
                   image:1,
                   caption:1,
                   likes:1,
                   "userid":"$user._id",
                   "username":"$user.name",
                   "userprofile":"$user.image"
                }
            }
        ])
       
        res.status(200)
        .json(
            new Apiresponse(200,posts,"posts fetched succesfully")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const isliked=async(req,res,next)=>{
    try {
        if(!req.user){
            throw new Apierror(400,"please login first");
        }
        const {id}=req.params;
        const post=await postmodel.findOne({_id:id});
        const isexist=post.likes.includes(req.user._id);
        if(!isexist){
           res.status(200)
           .json(
            new Apiresponse(200,false,"post isnt liked by user")
           )
        }
        res.status(200)
        .json(
            new Apiresponse(200,isexist,"post is already liked by user")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const isfollowed=async(req,res,next)=>{
    try {
    if(!req.user){
        throw new Apierror(400,"please login first");
    }
    const {id}=req.params;
    const post=await postmodel.findOne({_id:id});
    const receiver=post.user;
    const isfollow=await followermodel.findOne({sender:req.user._id,receiver:receiver});
    res.status(200)
    .json(
        new Apiresponse(200,!!isfollow,isfollow?"user already followed":"user not followed")
    )
    } catch (error) {
    console.log(error);
    next(error);       
    }
}