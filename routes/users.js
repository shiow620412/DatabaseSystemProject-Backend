var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {
  res.send('register');
});
router.get('/:account/log_in', function(req, res, next) {
  res.send('log_in');
}); 
router.get('/:account/find_password', function(req, res, next) {
  res.send('find_password');
});

router.post('/buy', function(req, res, next) {
  res.send('buy');
});
router.post('/cart', function(req, res, next) {
  res.send('put_in_cart');
});

module.exports = router;







