import express from "express";
import cartController from "../controller/cart.controller.js";
import middlewareService from "../helper/middleware.js";

const router = express.Router();

//delete
router.delete("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

//post the product into shoppingCart
router.post("/", middlewareService.verifyToken, cartController.putProduct); 

export default router;
