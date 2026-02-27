import { followermodel } from "../models/followermodel.js";
import { postmodel } from "../models/postmodel.js";
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js";

export const follow=async(req,res,next)=>{
    try {
        if(!req.user){
            throw new Apierror(400,"please login first");
        }
        const {id}=req.params;
        if(!id){
            throw new Apierror(400,"please mention id to follow");
        }
        const post=await postmodel.findOne({_id:id});
        const receiver=post.user;
        const followed=await followermodel.findOne({sender:req.user._id,receiver:receiver});
        if(followed){
            await followermodel.findByIdAndDelete(followed._id);
            return res.status(200)
            .json(
                new Apiresponse(200,{},"user unfollowed succesfully")
            )
        }
        const create=await followermodel.create({sender:req.user._id,receiver:receiver})
        if(!create){
            throw new Apierror(400,"an error occured while following the account");
        }
        res.status(200)
        .json(
            new Apiresponse(200,{},"acount followed succesfully")
        )
    } catch (error) {
        console.log(error);
        next(error)
    }
}