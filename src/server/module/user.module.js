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
<<<<<<< HEAD
            [values.account], (error, result) => {
=======
            values.account, (error, result) => {
>>>>>>> main
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
<<<<<<< HEAD




/*  User Select   */
const selectUser = (user,page) => {
    return new Promise((resolve, reject) => {
        console.log(user);
      connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          let minLimit=(Number(page)-1)*50  
          let maxLimit=(Number(page))*50  
          connection.query( // User撈取所有欄位的值組
            'SELECT * FROM Member  LIMIT ?,?' ,
            [minLimit,maxLimit],
            (error, result) => {
              if (error) {
                console.error('SQL error: ', error);
                reject(error); // 寫入資料庫有問題時回傳錯誤
              } else {
                resolve(result); // 撈取成功回傳 JSON 資料
              }
              connection.release();
            }
          );
        }
      });
    });
};

/*  User findBackPassword   */
const findBackPassword = (user,page) => {
    return new Promise((resolve, reject) => {
        console.log(user);
      connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          
          connection.query( // User撈取所有欄位的值組
            'SELECT * FROM Member  LIMIT ?,?' ,
            [minLimit,maxLimit],
            (error, result) => {
              if (error) {
                console.error('SQL error: ', error);
                reject(error); // 寫入資料庫有問題時回傳錯誤
              } else {
                resolve(result); // 撈取成功回傳 JSON 資料
              }
              connection.release();
            }
          );
        }
      });
    });
};

export default {
    Login,
    selectUser,
    findBackPassword
};
=======
export default {
    Login
};
>>>>>>> main
