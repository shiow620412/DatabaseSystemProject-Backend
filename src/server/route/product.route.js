import express from "express";
import productController from "../controller/product.controller.js";
import middlewareService from "../helper/middleware.js";
const router = express.Router();

//product
// find all
router.get('/', productController.getProducts ); 

//find 單一種類
router.get('/search', productController.searchProduct ); 
//TODO:
//查詢商品詳細資料
router.get("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//查詢暢銷商品
router.get("/rank/sales",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//查詢各類別暢銷商品
router.get("/search/categories/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

//查詢name in type 商品有多少
router.get("/search/category/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;