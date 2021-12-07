import express from "express";
const router = express.Router();

//delete
router.delete("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

//update
router.post("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 


export default router;
