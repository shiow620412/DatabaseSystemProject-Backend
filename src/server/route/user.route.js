import userController from "../controller/user.controller.js";
import express from "express";
import middleware from "../helper/middleware.js";


const router = express.Router();

//註冊會員
router.post('/register', userController.userRegister);

//會員登入
router.post('/login', userController.userLogin ); 

router.get('/findPassword', userController.findPassword ); 

//改密碼
router.put('/password', middleware.verifyToken, userController.modifyPassword );

router.get("/information", middleware.verifyToken, userController.getInformation);

//改個資
router.put('/information', middleware.verifyToken, userController.modifyInformation );

//新增信用卡
router.post('/creditCard', middleware.verifyToken, userController.addCreditCard );

//查詢信用卡
router.get('/creditCard', middleware.verifyToken, userController.findCreditCard );

//刪除信用卡
router.delete('/creditCard',middleware.verifyToken,userController.deleteCreditCard );

export default router;