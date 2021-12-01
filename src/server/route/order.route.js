import express from "express";
const router = express.Router();

//order
//find all
router.get("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//insert
router.post("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
// find by user id 
router.get("/:account",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;