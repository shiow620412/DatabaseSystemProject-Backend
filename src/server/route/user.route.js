<<<<<<< HEAD
import express from "express";
var router = express.Router();



/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send(req.method+" "+req.originalUrl);
// });

router.post('/', middlewareService.verifyToken, userController.getUser ); 

router.post('/register', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/login', middlewareService.verifyToken, userController.userLogin ); 

// router.get('/findPassword', function(req, res, next) {
//     res.send(req.method+" "+req.originalUrl);
// });
router.post('/findPassword', userController.findPassword ); 
=======
import userController from "../controller/user.controller.js";
import express from "express";
import middlewareService from "../middlewareService.js";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/register', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/login', userController.userLogin ); 

router.get('/findPassword', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
>>>>>>> main

router.post('/buy', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/cart', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

export default router;







