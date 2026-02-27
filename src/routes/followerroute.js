import express from "express"
import { follow } from "../controllers/followercontroller.js";
import { authmiddelware } from "../../middelware/authmiddelware.js";

const router=express.Router();

router.post("/follow/:id",authmiddelware,follow)

export default router