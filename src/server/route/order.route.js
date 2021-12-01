import express from "express";
<<<<<<< HEAD
var router = express.Router();

=======
const router = express.Router();
>>>>>>> main

//order
//find all
router.get("/",(req,res,next)=>{
<<<<<<< HEAD
    let sql= `SELECT * FROM  ${req}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(req.method+" "+req.originalUrl);
    });
    
=======
    res.send(req.method+" "+req.originalUrl);
>>>>>>> main
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