import express from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/register', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
});
router.post('/login', function(req, res, next) {
    res.send(req.method+" "+req.originalUrl);
}); 
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







