import express from "express";
const router = express.Router();

//上傳圖片
router.post("/upload",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

//
router.post("/:filename",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

export default router;