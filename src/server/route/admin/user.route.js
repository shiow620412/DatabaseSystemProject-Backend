import userController from "../../controller/admin/user.controller.js";
import express from "express";
import middlewareService from "../../helper/middleware.js";

const router = express.Router();
//停/復權用戶
router.post("/users/:id/banstatus",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
}); 

router.get('/', middlewareService.verifyToken, middlewareService.checkAdmin, userController.getUser ); 

export default router;