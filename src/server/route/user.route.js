import userController from "../controller/user.controller.js";
import express from "express";
import middlewareService from "../helper/middleware.js"


const router = express.Router();

/* GET users listing. */
// TODO: go to admin
router.get('/',middlewareService.verifyToken, middlewareService.checkAdmin, userController.getUser ); 

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin ); 

router.get('/findPassword', userController.findPassword ); 

router.post('/buy', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/cart', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});


//改密碼
router.put('/password', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//改個資
router.put('/information', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//新增信用卡
router.post('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//查詢信用卡
router.get('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//修改信用卡
router.put('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
//刪除信用卡
router.delete('/creditcard', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});


export default router;







