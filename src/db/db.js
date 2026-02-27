import mongoose from "mongoose";

export const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected succesfully");
    } catch (error) {
        console.log("an error occured while connecting db",error);
    }
}