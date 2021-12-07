import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
import cart from "./cart.route.js"
import admin from "./admin/index.route.js"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/order",order);
router.use("/product",product);
router.use("/user",user);
router.use("/cart",cart);
router.use("/admin",admin);

export default router;
