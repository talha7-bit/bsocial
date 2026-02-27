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
    origin:" http://localhost:5173",
    credentials:true
}))

app.use("/api/user",userrouter);
app.use("/api/follower",followerrouter);
app.use("/api/post",postrouter)

app.use("/",(req,res)=>{
    res.send("everything is working");
})

app.get("/api/me",authmiddelware,(req,res,next)=>{
    try {
        if(!req.body){
            throw new Apierror(400,"user is not logged in");
        }
        res.status(200)
        .json(
            new Apiresponse(200,{},"user is logged in")
        )
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export {app}