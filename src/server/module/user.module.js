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
 * @param  {string} values.address
 */
const Register = (values) => {
    return new Promise((resolve,reject) => {
        query("SELECT * FROM Member WHERE Account = ? AND Email = ?", [values.account,values.email]).then((result) => {
            if (Object.keys(result).length === 0) {
                query('INSERT INTO `Member`(`Email`, `Name`, `Account`, `Password`, `Address`, `IsAdmin`, `isBan`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [values.email, values.name, values.account, values.password, values.address, 0 , 0]).then((result) => {
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
/**
 * @param  {object} user
 * @param  {number} page
 */
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
/**
 * @param  {object} user
 * @param  {number} user.id
 * @param  {object} value
 * @param  {string} value.cardNumber
 */
const deleteCreditCard =(user,value)=>{
    return new Promise((resolve,reject) => {
        query('DELETE FROM `CreditCard` WHERE `MemberID` = ?  AND `CreditCardNumber` = ? ', [user.id, value.cardNumber]).then((result) => {
            resolve({ 
                code: 200, 
                message: '刪除成功', 
            });  
        }).catch((error) => {reject(error);});
    }) 
}
/**
 * @param  {object} user
 * @param  {number} user.id
 * @param  {object} value
 * @param  {string} value.email
 * @param  {string} value.name
 * @param  {string} value.address
 */
const modifyInformation = (user,value) =>{
    return new Promise((resolve,reject) => {
        query('UPDATE `Member` SET Email = ? , Name = ? ,Address = ? WHERE `MemberID` = ? ', [value.email, value.name, value.address, user.id,]).then((result) => {
            resolve({ 
                code: 200, 
                message: '更改成功', 
            });  
        }).catch((error) => {reject(error);});
    }) 
}

/**
 * @param  {object} user
 * @param  {number} user.id
 * @param  {object} value
 * @param  {string} value.oldPassword
 * @param  {string} value.newPassword
 */
 const modifyPassword = (user,value) =>{
    return new Promise((resolve,reject) => {
        query("SELECT * FROM `Member` WHERE MemberID = ? AND Password = ?", [user.id, value.oldPassword]).then((result) => {
            if (Object.keys(result).length === 0) {
                reject(error.APIError("舊密碼錯誤", new Error()));
            } else {               
                 query('UPDATE `Member` SET Password = ? WHERE MemberID = ?',
                    [value.newPassword,user.id]).then((result) => {
                        resolve({ 
                            code: 200,
                            message: '修改成功', 
                        });  
                    });
            }
        }).catch((error) => {reject(error);})
    });
}
export default {
    Login,
    findBackPassword ,
    Register,
    addCredictCard,
    findCredictCard,
    deleteCreditCard,
    modifyInformation,
    modifyPassword
};