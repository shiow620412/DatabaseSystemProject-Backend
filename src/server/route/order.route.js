import express from "express";
import orderController from "../controller/order.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();

// find by user id 
router.get("/",middleware.verifyToken,orderController.searchOrder);

// 建立訂單
router.post('/', middleware.verifyToken, orderController.createProduct);

// 取消訂單
router.delete("/:id",middleware.verifyToken,orderController.deleteOrder);

// 查詢訂單詳細資料
router.get("/:id/detail",middleware.verifyToken,orderController.checkOrderDetail);

export default router;