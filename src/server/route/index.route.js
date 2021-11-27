import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/order",order);
router.use("/product",product);
router.use("/user",user);

export default router;
