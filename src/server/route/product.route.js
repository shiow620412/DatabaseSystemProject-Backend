import express from "express";
import productController from "../controller/product.controller.js";
const router = express.Router();

//product
// 以類別顯示商品
router.get('/categories/:type', productController.getProducts ); 

//查詢各類別商品
// localhost:3000/api/products/search/categories?productName= & page=
router.get('/search/categories', productController.searchProductByName ); 

<<<<<<< HEAD

router.get("/search", productController.searchByName);

//查詢商品詳細資料
router.get("/:id",productController.getProductDetail);
=======
//用名字搜尋總類別
//localhost:3000/api/products/search?productName= & page=
router.get("/search",productController.searchProductInAll);
>>>>>>> main

//查詢暢銷商品
// localhost:3000/api/products/sales
router.get("/sales",productController.rankProductBySales);

//查詢各類別商品有多少 by name
//localhost:3000/api/products/search/category
router.get("/search/category",productController.countProductByCategory);

<<<<<<< HEAD
=======
//查詢商品詳細資料
router.get("/:id",productController.getProductDetail);


>>>>>>> main

export default router;