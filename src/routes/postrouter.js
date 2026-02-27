import express from "express"
import { authmiddelware } from "../../middelware/authmiddelware.js";
import { upload } from "../../middelware/multer.js";
import { deletep, getall, getallposts, isfollowed, isliked, post } from "../controllers/postcontroller.js";

const router=express.Router();

router.post("/post",authmiddelware,upload.single("image"),post);

router.post("/delete/:id",authmiddelware,deletep);

router.get("/getall",authmiddelware,getall);

router.get("/getallposts",getallposts);

router.get("/isliked/:id",authmiddelware,isliked);

router.get("/isfollowed/:id",authmiddelware,isfollowed);

export default router