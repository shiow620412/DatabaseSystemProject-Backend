import express from "express";
import orderController from "../controller/order.controller.js";
import middlewareService from "../helper/middleware.js";

const router = express.Router();

//find all
router.get('/', middlewareService.verifyToken,orderController.getOrder); 

//insert
router.post("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

// find by user id 
router.get("/:account",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;