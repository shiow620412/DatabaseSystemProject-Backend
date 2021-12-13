import express from "express";
const router = express.Router();


router.post("/upload", (req, res, next) => {
    res.send(req.method + " " + req.originalUrl);
});


//

export default router;