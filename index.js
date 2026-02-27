import { app } from "./main.js";
import { connectdb } from "./src/db/db.js";
import dotenv from "dotenv"

dotenv.config();
connectdb();

const PORT=process.env.PORT || 3000

app.listen(PORT,(req,res)=>{
    console.log(`server is running on http://localhost:${PORT}`);
})