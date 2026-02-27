import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})

export const postmodel=mongoose.model("post",postSchema);