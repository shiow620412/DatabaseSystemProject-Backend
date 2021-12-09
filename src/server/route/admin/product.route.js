import productController from "../../controller/admin/product.controller.js";
import express from "express";

const router = express.Router();
//insert
router.post('/', productController.addProduct); 
//  TODO:
router.delete("/:id",productController.deleteProduct);

//modify
router.put("/:id",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;