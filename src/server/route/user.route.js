import userController from "../controller/user.controller.js";
import express from "express";
import middlewareService from "../middlewareService.js";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

router.post('/register', userController.userResgister);
    
router.post('/login', userController.userLogin ); 

router.get('/findPassword', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

router.post('/buy', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/cart', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

export default router;







