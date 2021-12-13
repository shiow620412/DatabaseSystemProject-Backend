import productController from "../../controller/admin/product.controller.js";
import express from "express";

const router = express.Router();

//上架商品
router.post('/', productController.addProduct); 

//下架商品
router.delete("/:id",productController.deleteProduct);

//更新商品
router.put("/:id",productController.modifyProduct);

export default router;