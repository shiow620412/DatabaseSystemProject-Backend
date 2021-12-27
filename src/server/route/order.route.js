import express from "express";
import orderController from "../controller/order.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();

// find by user id 
router.get("/",middleware.verifyToken,orderController.getOrders);

// 建立訂單
router.post('/', middleware.verifyToken, middleware.checkStock, orderController.createOrder);

// 取消訂單
router.delete("/:orderId",middleware.verifyToken,orderController.deleteOrder);

// 查詢訂單詳細資料
router.get("/:orderId/detail",middleware.verifyToken,orderController.getOrderDetail);

export default router;