import mongoose from "mongoose";

const followerSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

export const followermodel=mongoose.model("follower",followerSchema);