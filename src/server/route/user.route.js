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

router.post('/buy', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/cart', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});

export default router;







