import userController from "../controller/user.controller.js";
import express from "express";
import middlewareService from "../helper/middleware.js"


const router = express.Router();

/* GET users listing. */

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

export default router;







