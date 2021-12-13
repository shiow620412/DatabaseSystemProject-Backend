import express from "express";
import imgController from "../../controller/img.controller.js";
const router = express.Router();


router.get("/:filename", (req, res, next) => {
    res.send(req.method + " " + req.originalUrl);
});
