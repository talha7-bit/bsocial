import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+@.+\..+/,"Please enter a valid email address"],
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String
    }
})

userSchema.pre("save",async function () {
 if(!this.isModified("password")) return;
 const hash=await bcrypt.hash(this.password,10);
 this.password=hash;
 return;   
})

export const usermodel=mongoose.model("user",userSchema);