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

/*  User list   */
/**
 * @param  {object} user
 * @param  {string} page
 */
const listUser = (user,page) => {
    console.log(page)
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let maxLimit=(Number(page))*50  
        query('SELECT * FROM Member  LIMIT ?,?', [minLimit,maxLimit]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);});
    })    
};

/*  User findBackPassword   */
/**
 * @param  {object} value
 * @param  {string} value.Email
 */
const findBackPassword = (value) => {
    return new Promise((resolve,reject) => {
        query('SELECT Password FROM Member  WHERE Email = ?',value.Email ).then((result) => {            
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

/** User buy product */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {string} user.name
 * @param  {string} user.mail
 * @param  {object} values
 * @param  {array} values.price
 * @param  {array} values.quantity
 * @param  {string} values.date
 * @param  {string} values.orderStatus
 * @param  {string} values.paymentMethod
 * @param  {array} values.productID
 */
const buyProduct = (user, values) => {
    let total = 0;
    values.price.forEach((num, index) => {
        total += Number(values.price[index]) * Number(values.quantity[index]);
    });
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Order` (`MemberID`,`Date`, `Total`, `OrderStatus`, `PaymentMethod`) VALUES (?, ?, ?, ?, ?)',
            [user.id, values.date, total, values.orderStatus, values.paymentMethod]).then((result) => {
                const orderId = result.insertId;
                let sql = 'INSERT INTO `OrderDetail` (`OrderID`,`ProductID`, `Quantity`) values';
                const parameterBracket = [];
                const parameters = [];
                values.productID.forEach((value, index) => {
                    parameterBracket.push("(?,?,?)");
                    parameters.push(orderId, value , values.quantity[index]);
                })
                query(sql+ parameterBracket.join(","),
                parameters).then((result) => {
                    resolve({
                        code: 200,
                        message: "購買成功",
                    });
                });  
        }).catch((error) => {reject(error);});
    });
}

/** User put the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {array} values.productID
 * @param  {array} values.quantity
 */
const shoppingCart = (user, values) => {
    return new Promise((resolve,reject) => {
        let sql = 'INSERT INTO `ShoppingCart` (`MemberID`, `ProductID`, `Quantity`) VALUES ';
        const parameterBracket = [];
        const parameters = [];
        values.productID.forEach((value, index) => {
            parameterBracket.push("(?,?,?)");
            parameters.push(user.id, value , values.quantity[index]);
        })
        query(sql+ parameterBracket.join(","),
        parameters).then((result) => {
            resolve({
                code: 200,
                message: "放置購物車成功",
            });
        }).catch((error) => {reject(error);});
    })
}

export default {
    Login,
    listUser,
    findBackPassword ,
    Register,
    buyProduct,
    shoppingCart
};