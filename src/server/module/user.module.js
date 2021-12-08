import config from '../../config/config.js';
import jwt from 'jsonwebtoken';
import error from '../helper/error.js';
import query from '../database/basic.database.js';

/*  User GET (Login)登入取得資訊  */
/**
 * @param  {object} values
 * @param  {string} values.account
 * @param  {string} values.password
 */
const Login = (values) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM Member WHERE Account = ?", values.account).then((result) => {
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
                reject(error.APIError("輸入的密碼有誤")); 
            }
        }).catch((error) => {reject(error);})
    })
};

/*  User findBackPassword   */
/**
 * @param  {object} value
 * @param  {string} value.email
 */
const findBackPassword = (value) => {
    return new Promise((resolve,reject) => {
        query('SELECT Password FROM Member  WHERE Email = ?',value.email ).then((result) => {            
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
};

/** User Register */
/**
 * @param  {object} values
 * @param  {string} values.email
 * @param  {string} values.name
 * @param  {string} values.account
 * @param  {string} values.password
 */
const Register = (values) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM Member WHERE Account = ? AND Email = ?", [values.account,values.email]).then((result) => {
            if (Object.keys(result).length === 0) {
                query('INSERT INTO `Member`(`Email`, `Name`, `Account`, `Password`, `IsAdmin`) VALUES (?, ?, ?, ?, ?)',
                    [values.email, values.name, values.account, values.password, 0]).then((result) => {
                        resolve({ 
                            code: 200,
                            message: '註冊成功', 
                        });  
                    });
            } else {
                reject(error.APIError("註冊失敗", new Error())); 
            }
        }).catch((error) => {reject(error);})
    });
};
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} credit
 * @param  {string} credit.number
 * @param  {string} credit.secret
 * @param  {number} credit.month
 * @param  {number} credit.year
 */
const addCredictCard = (user,credit) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM `CreditCard` WHERE CreditCardNumber = ? AND SecurityCode = ?", [credit.number,credit.secret]).then((result) => {
            if (Object.keys(result).length === 0) {
                query('INSERT INTO `CreditCard`(`CreditCardNumber`, `MemberID`, `ExpireYear`, `ExpireMonth`, `SecurityCode`) VALUES (?, ?, ?, ?, ?)',
                    [credit.number, user.id, credit.year, credit.month, credit.secret]).then((result) => {
                        resolve({ 
                            code: 200, 
                            message: '新增成功', 
                        });  
                    });
            } else {
                reject(error.APIError("新增失敗", new Error())); 
            }
        }).catch((error) => {reject(error);})
    });
}

const findCredictCard =(user,page)=>{
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        query('SELECT * FROM `CreditCard` WHERE `MemberID` = ?  LIMIT ?,?', [user.id, minLimit, 50]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);});
    }) 
}


export default {
    Login,
    findBackPassword ,
    Register,
    addCredictCard,
    findCredictCard
};