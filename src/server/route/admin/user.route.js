import userController from "../../controller/admin/user.controller.js";
import express from "express";


const router = express.Router();

//停/復權用戶
router.put('/:id/:status', userController.modifyUser); 

router.get('/', userController.getUsers ); 

export default router;