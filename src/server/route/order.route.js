import express from "express";
import orderController from "../controller/order.controller.js";
import middlewareService from "../helper/middleware.js";

const router = express.Router();

//find all
router.get('/', middlewareService.verifyToken,orderController.getOrder); 

//insert
router.post("/",middlewareService.verifyToken,middlewareService.checkAdmin, orderController.addOrder); 

// find by user id 
router.get("/:account",middlewareService.verifyToken,orderController.searchOrder);

export default router;