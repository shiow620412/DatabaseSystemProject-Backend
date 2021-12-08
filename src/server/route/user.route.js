import userController from "../controller/user.controller.js";
import express from "express";
import middleware from "../helper/middleware.js";


const router = express.Router();

/* GET users listing. */

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin ); 

//暫時不用
router.get('/findPassword', userController.findPassword ); 

//改密碼
router.put('/password', middleware.verifyToken, userController.modfiyPassword );

//改個資
router.put('/information', middleware.verifyToken, userController.modfiyInformation );

//新增信用卡
router.post('/creditCard', middleware.verifyToken, userController.addCredictCard );

//查詢信用卡
router.get('/creditCard', middleware.verifyToken, userController.findCredictCard );

//刪除信用卡
router.delete('/creditCard',middleware.verifyToken,userController.deleteCreditCard );


export default router;