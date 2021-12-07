import express from "express";

//停/復權用戶
router.post("/users/:id/banstatus",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 


export default router;