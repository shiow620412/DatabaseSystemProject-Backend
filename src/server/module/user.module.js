// user.module.js
import mysql from 'mysql8';
import config from '../../config/config.js';
import jwt from 'jsonwebtoken';
import error from '../helper/error.js';
//import apiError from '../helper/apiError.js';
import query from '../database/basic.database.js';
const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

/*  User GET (Login)登入取得資訊  */
const Login = (values) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM Member5 WHERE Account = ?", values.account).then((result) => {
            const queryPassword = result[0].Password; 
            const userPassword = values.password; 
            if (queryPassword === userPassword) {
                // 產生 JWT
                const payload = {
                    user_id: result[0].MemberID,
                    user_name: result[0].Name,
                    user_mail: result[0].Email
                };
                // 取得 API Token
                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (86400 * 365) }, config.secretKey);
                resolve({ 
                    code: 200,
                    message: '登入成功', 
                    token 
                }); 
            } else {
                reject(error.APIError("輸入的密碼有誤",new Error())); // 登入失敗 輸入的密碼有誤
            }
        }).catch((error) => {reject(error);})
    })
   
  };
export default {
    Login
};
