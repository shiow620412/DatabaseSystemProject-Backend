import express from "express";
import productController from "../controller/product.controller.js";
import middlewareService from "../helper/middleware.js";
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
router.post('/',middlewareService.verifyToken, productController.addProduct ); 

router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
export default router;