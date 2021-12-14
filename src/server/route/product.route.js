import express from "express";
import productController from "../controller/product.controller.js";
const router = express.Router();

//product
// find all
router.get('/categories/:type', productController.getProducts ); 

//find 單一種類//查詢總類別符合此名字的商品
router.get('/search/categories', productController.searchProduct ); 

router.get("/search",productController.searchProductInAll);
//查詢商品詳細資料
router.get("/:id",productController.getProductDetail);

//查詢暢銷商品
router.get("/sales",productController.rankProductBySales);

//查詢name in type 商品有多少
router.get("/search/category",productController.countProductByCategory);


export default router;