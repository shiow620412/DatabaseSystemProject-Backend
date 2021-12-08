import productController from "../../controller/admin/product.controller.js";
import express from "express";
import middlewareService from "../../helper/middleware.js";

const router = express.Router();
//insert
router.post('/', productController.addProduct); 

router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;