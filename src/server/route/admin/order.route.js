import express from "express";
import orderController from "../../controller/admin/order.controller.js";
const router = express.Router();

//find all
router.get('/',orderController.getOrders); 

//modify orders cancel
router.put('/:id',orderController.cancelOrder); 

export default router;