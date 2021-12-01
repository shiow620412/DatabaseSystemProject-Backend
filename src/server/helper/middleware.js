
import JWT from "jsonwebtoken";
import config from "../../config/config.js";
import httpStatus from "http-status";
import checkAdminByUserID from "../database/member.database.js";
import error from "./error.js";


function verifyToken(req, res, next){
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' '); // 字串切割
        const bearerToken = bearer[1]; // 取得 JWT
        req.token = bearerToken; // 在response中建立一個token參數
        JWT.verify(bearerToken, config.secretKey, (err,payload) => {
            if(err){
                res.status(401).send({ 
                        code: 401,
                        message: '金鑰驗證失敗！' 
                    }); 
            }else{
                req.user = {
                    id: payload['payload'].user_id,
                    name: payload['payload'].user_name,
                    mail: payload['payload'].user_mail
                }
                console.log("BearerToken 解密\n"+JSON.stringify(req.user))
                next();
            }
        });
    } else {
        res.status(403).send({ 
            code: 403,
            message: '您尚未登入！' 
        }); // Header 查無 Bearer Token
    }
};



function outputError(err, req, res, next){
    if (err.sql){
        res.status(err.status).json({
            sql: err.sql,
            message: err.isPublic ? err.message : httpStatus[err.status],
            code: err.code ? err.code : httpStatus[err.status],
            stack: config.env === 'development' ? err.stack : {}
        });
    }else{
        res.status(err.status).json({
            message: err.isPublic ? err.message : httpStatus[err.status],
            code: err.code ? err.code : httpStatus[err.status],
            stack: config.env === 'development' ? err.stack : {}
        });
    }
    
}

function checkAdmin(req, res, next){
    checkAdminByUserID(req.user.id).then((result)=>{
        if(result === true){
            next();
        }else{
            res.status(403).send({
                code:403,
                message:httpStatus[403]
            })
        }
    }).catch((_error) => {next(error.MySQLError(_error))});
    
}


export default {
    verifyToken,
    outputError,
    checkAdmin
};