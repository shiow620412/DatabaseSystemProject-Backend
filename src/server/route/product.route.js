import express from "express";
const router = express.Router();

//product
// find all
router.get("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
//find 單一種類
router.get("/search",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
//insert
router.post("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
export default router;