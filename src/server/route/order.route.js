import express from "express";
var router = express.Router();


//order
//find all
router.get("/",(req,res,next)=>{
    let sql= `SELECT * FROM  ${req}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(req.method+" "+req.originalUrl);
    });
    
});
//insert
router.post("/",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});
// find by user id 
router.get("/:account",(req,res,next)=>{
    res.send(req.method+" "+req.originalUrl);
});

export default router;