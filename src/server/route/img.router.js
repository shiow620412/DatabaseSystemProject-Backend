import express from "express";
import imgController from "../controller/img.controller.js";
const router = express.Router();


router.get("/:filename", imgController.loadImg);


export default router;