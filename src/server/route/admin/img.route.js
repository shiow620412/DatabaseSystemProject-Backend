import express from "express";
import multer  from 'multer';
import imgController from "../../controller/img.controller.js";
import imgur from 'imgur-node-api';
const upload = multer({ dest: 'img_temp/' })
const IMGUR_CLIENT_ID = "df0e1d6a465c8dc"
const router = express.Router();


//上傳圖片

router.post('/upload',upload.single('image'),imgController.uploadImg) 


export default router;