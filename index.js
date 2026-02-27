import { app } from "./main.js";
import { connectdb } from "./src/db/db.js";
import dotenv from "dotenv"

dotenv.config();
connectdb();

app.listen(3000,(req,res)=>{
    console.log("server is running on http://localhost:3000");
})