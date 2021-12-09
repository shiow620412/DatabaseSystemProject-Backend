import query from '../database/basic.database.js';

/** User put the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {array} values.productID
 * @param  {array} values.quantity
 */
const putProduct = (user, values) => {
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

/** User put the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {string} values.productID
 */
 const removeProduct = (user, values) => {
    return new Promise((resolve,reject) => {
        query('DELETE FROM ShoppingCart WHERE MemberID =? and ProductID =?',[user.id,values.productID]).then((result) => {
            resolve({
                code: 200,
                message: "移除成功",
            });
        }).catch((error) => {reject(error);});
    })
}



export default {
    putProduct,
    removeProduct
};