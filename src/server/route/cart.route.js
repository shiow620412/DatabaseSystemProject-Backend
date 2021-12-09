import express from "express";
import cartController from "../controller/cart.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();

//delete
router.delete("/", middleware.verifyToken, cartController.removeProduct); 

//TODO: 要判斷庫存
//post the product into shoppingCart
router.post("/", middleware.verifyToken, cartController.putProduct); 

router.put("/", middleware.verifyToken, cartController.modifyProductQuantity); 

export default router;
