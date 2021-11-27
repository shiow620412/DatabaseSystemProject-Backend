// user.module.js
import mysql from 'mysql8';
import config from '../../config/config.js';
import jwt from 'jsonwebtoken';
import apiError from '../helper/apiError.js';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
/*  User GET (Login)登入取得資訊  */
const Login = (values) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
        if (connectionError) {
            
            reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          connection.query( // User撈取所有欄位的值組
            'SELECT * FROM Member WHERE Account = ?',
            values.account, (error, result) => {
                if (error) {
                    reject(new apiError.MySQLError()); 
                } else if (Object.keys(result).length === 0) {
                    reject(new apiError.LoginError()); 
                } else {
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
                        reject(new apiError.LoginError()); // 登入失敗 輸入的密碼有誤
                    }
                }
                connection.release();
            });
        }
      });
    });
  };

const Resgister = (values) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
        if (connectionError) {
            
            reject(connectionError); // 若連線有問題回傳錯誤
        } else {
            const memberEmail = values.email;
            const memberName = values.name;
            const memberAccount = values.account;
            const memberPassword = values.password;
            
            connection.query( // User新增帳號資料 
                'SELECT * FROM Member WHERE Account = ? AND Email = ?',
                [memberAccount, memberEmail], (error, result) => {
                    if (error) {
                        reject(new apiError.MySQLError()); 
                    } else if (Object.keys(result).length === 0) {
                        connection.query(
                            'INSERT INTO `Member`(`Email`, `Name`, `Account`, `Password`, `IsAdmin`) VALUES (?, ?, ?, ?, ?)',
                            [memberEmail, memberName, memberAccount, memberPassword, 0], (error, result) => {
                                if (error) {
                                    reject(new apiError.MySQLError()); 
                                } else if (Object.keys(result).length === 0) {
                                    reject(new apiError.LoginError()); 
                                } else {
                                    resolve({ 
                                        code: 200,
                                        message: '註冊成功', 
                                    });  
                                }
                            });
                    } else {
                        reject(new apiError.LoginError());
                    }
                    connection.release();
                });
        }
      });
    });
  };

export default {
    Login,
    Resgister
};
