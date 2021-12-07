import express from "express";
//modify orders
router.post("/order/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 


export default router;