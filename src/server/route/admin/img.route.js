import express from "express";
const router = express.Router();

//上傳圖片
router.post("/img/upload",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

//
router.post("/img/:filename",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

export default router;