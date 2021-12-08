import userController from "../controller/user.controller.js";
import express from "express";
import middleware from "../helper/middleware.js";


const router = express.Router();

/* GET users listing. */

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin ); 

router.get('/findPassword', userController.findPassword ); 

//改密碼
router.put('/password', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//改個資
router.put('/information', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//新增信用卡
router.post('/creditCard', middleware.verifyToken, userController.addCredictCard ); 
//查詢信用卡
router.get('/creditCard', middleware.verifyToken, userController.findCredictCard ); 
//修改信用卡 用不到
router.put('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//刪除信用卡
router.delete('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

export default router;