import express from "express";
import cartController from "../controller/cart.controller.js";
import middleware from "../helper/middleware.js";

const router = express.Router();
router.get("/", middleware.verifyToken, cartController.getCart);
//delete
router.delete("/", middleware.verifyToken, cartController.removeProduct); 

//TODO: 要判斷同商品同user ID 要合併
//post the product into shoppingCart
router.post("/", middleware.verifyToken, cartController.putProduct); 

router.put("/", middleware.verifyToken, cartController.modifyProductQuantity); 

export default router;
