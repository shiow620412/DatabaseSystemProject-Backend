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

router.use("/orders",order);
router.use("/products",product);
router.use("/users",user);
router.use("/carts",cart);
router.use("/admins",admin);

export default router;
