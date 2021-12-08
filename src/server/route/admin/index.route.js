
import express from "express";
import order from "./order.route.js"
import product from "./product.route.js"
import user from "./user.route.js"
import img from "./img.route.js"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.use("/orders",order);
router.use("/products",product);
router.use("/users",user);
router.use("img",img);


export default router;





