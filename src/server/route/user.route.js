import userController from "../controller/user.controller.js";
import express from "express";


const router = express.Router();

/* GET users listing. */

router.get('/', middlewareService.verifyToken, userController.getUser ); 
router.post('/register', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/login', userController.userLogin ); 
// router.post('/findPassword', userController.findPassword ); 
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







