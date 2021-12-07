import express from "express";


//上傳圖片
router.post("/img/upload",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

export default router;