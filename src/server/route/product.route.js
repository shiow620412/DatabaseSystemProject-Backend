import express from "express";
import productController from "../controller/product.controller.js";
import middlewareService from "../helper/middleware.js";

const router = express.Router();

// find all
router.get('/', productController.getProducts ); 

//find 單一種類
router.get('/search', productController.searchProduct ); 

//insert
router.post('/',middlewareService.verifyToken,middlewareService.checkAdmin, productController.addProduct); 

router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;