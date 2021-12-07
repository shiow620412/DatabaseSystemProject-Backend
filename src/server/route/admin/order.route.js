import express from "express";
import middleware from "../../helper/middleware.js";
import orderController from "../../controller/admin/order.controller.js";
const router = express.Router();

//find all
router.get('/', middleware.verifyToken,orderController.getOrder); 


//modify orders
router.post("/order/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 


export default router;