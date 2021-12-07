import userController from "../controller/user.controller.js";
import express from "express";
import middlewareService from "../helper/middleware.js"


const router = express.Router();

/* GET users listing. */
router.get('/', middlewareService.verifyToken, middlewareService.checkAdmin, userController.getUser ); 

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin ); 

router.get('/findPassword', userController.findPassword ); 

router.post('/buyProduct', middlewareService.verifyToken, userController.userBuyProduct);

router.post('/shoppingCart', middlewareService.verifyToken, userController.userShoppingCart);

export default router;