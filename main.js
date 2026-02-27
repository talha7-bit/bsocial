import express from "express"
import userrouter from "./src/routes/userrouter.js"
import followerrouter from "./src/routes/followerroute.js"
import postrouter from "./src/routes/postrouter.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { authmiddelware } from "./middelware/authmiddelware.js";
import { Apierror } from "./src/utils/Apierror.js";
import { Apiresponse } from "./src/utils/Apiresponse.js";

const app=express();
const router=express.Router();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(cors({
    origin:"https://fsociall.vercel.app/",
    credentials:true
}))

app.use("/api/user",userrouter);
app.use("/api/follower",followerrouter);
app.use("/api/post",postrouter)

app.use("/",(req,res)=>{
    res.send("everything is working");
})



export {app}