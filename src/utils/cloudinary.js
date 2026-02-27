import {v2 as cloudinary} from "cloudinary"
import { Apierror } from "./Apierror.js"

export const uploadoncloudinary=async(localfilepath)=>{
    try {
        if(!localfilepath){
            throw new Apierror(400,"filepath isn't provided");
        }
    cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    })
    const response=await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto",
        folder:"social"
    })
    console.log("image uploaded on cloudinary");
    return response;
    } catch (error) {
        throw new Apierror(400,"an error occured while uploading image")
    }
}