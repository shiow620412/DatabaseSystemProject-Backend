
import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.use("/order",order);
router.use("/product",product);
router.use("/user",user);


export default router;





