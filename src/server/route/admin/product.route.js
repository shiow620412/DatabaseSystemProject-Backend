import productController from "../../controller/admin/product.controller.js";
import express from "express";
import middleware from "../../helper/middleware.js";

const router = express.Router();
//insert
router.post('/', productController.addProduct); 
// don't need TODO:
router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;