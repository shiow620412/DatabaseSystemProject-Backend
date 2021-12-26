import productController from "../../controller/admin/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/", productController.getAllProductStatus)

//上架商品
router.post('/', productController.addProduct); 

//下架商品
router.delete("/:productId",productController.deleteProduct);

//更新商品
router.put("/:productId",productController.modifyProduct);

export default router;