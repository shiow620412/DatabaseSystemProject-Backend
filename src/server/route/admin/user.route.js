import express from "express";
const router = express.Router();
//停/復權用戶
router.post("/users/:id/banstatus",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 


export default router;