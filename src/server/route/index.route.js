import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
<<<<<<< HEAD
var router = express.Router();
=======
const router = express.Router();
>>>>>>> main

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/order",order);
router.use("/product",product);
router.use("/user",user);

export default router;
