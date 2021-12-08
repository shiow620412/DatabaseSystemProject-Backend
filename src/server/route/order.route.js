import express from "express";
import orderController from "../controller/order.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();

// find by user id 
router.get("/",middleware.verifyToken,orderController.searchOrder);

router.post('/', middleware.verifyToken, orderController.orderProduct);

// 取消訂單
router.delete("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

// 查詢訂單詳細資料
router.get("/:id/detail",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;