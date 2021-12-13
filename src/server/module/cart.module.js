import query from '../database/basic.database.js';
import error from '../helper/error.js';
/** User put the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {number} values.productID
 * @param  {number} values.quantity
 */
const putProduct = (user, values) => {
    return new Promise((resolve, reject) => {
        let stock;
        query('SELECT Stock FROM Product WHERE ProductID = ?', [values.productID]).then((result) => {
            console.log(result);
            stock = Number(result[0].Stock);
            if (stock >= values.quantity) {
                query("SELECT * FROM ShoppingCart WHERE MemberID = ? AND ProductID = ?", [user.id, values.productID]).then((results) => {
                    if (Object.keys(results).length === 0) {
                        query('INSERT INTO `ShoppingCart` (`MemberID`, `ProductID`, `Quantity`) VALUES (?,?,?)', [user.id, values.productID, values.quantity]).then((result) => {
                            resolve({
                                code: 200,
                                message: "放置購物車成功",
                            });
                        }).catch((error) => {
                            reject(error);
                        })

                    } else {
                        const newQuantity = Number(results[0].Quantity) + Number(values.quantity);
                        console.log(newQuantity);
                        console.log(results);
                        query('UPDATE `ShoppingCart` SET Quantity = ?  WHERE MemberID = ? AND ProductID = ?', [newQuantity, user.id, values.productID]).then((result) => {
                            resolve({
                                code: 200,
                                message: "商品數量增加成功",
                            });
                        }).catch((error) => {
                            reject(error);
                        })
                    }
                }).catch((error) => {
                    reject(error);
                })
            } else {
                reject(error.APIError("數量不足", new Error()));
            }
        }).catch((error) => {
            reject(error);
        });


    })
}

/** User remove the product to the shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {string} values.productID
 */
 const removeProduct = (user, values) => {
    return new Promise((resolve, reject) => {
        query('DELETE FROM ShoppingCart WHERE MemberID =? and ProductID =?', [user.id, values.productID]).then((result) => {
            resolve({
                code: 200,
                message: "移除成功",
            });
        }).catch((error) => {
            reject(error);
        });
    })
}

/** User modify the quantity of product in shopping cart */
/**
 * @param  {object} user
 * @param  {string} user.id
 * @param  {object} values
 * @param  {string} values.productID
 * @param  {number} values.quantity
 */
const modifyProductQuantity = (user, values) => {
    return new Promise((resolve, reject) => {
        let stock;
        query('SELECT Stock FROM Product WHERE ProductID = ?', [values.productID]).then((result) => {
            stock = Number(result[0].Stock);
            if (stock >= values.quantity) {
                query('UPDATE `ShoppingCart` SET Quantity = ? WHERE MemberID = ? AND ProductID = ? ', [values.quantity, user.id, values.productID]).then((result) => {
                    resolve({
                        code: 200,
                        message: "商品數量更改成功",
                    });
                }).catch((error) => {
                    reject(error);
                });
            } else {
                reject(error.APIError("數量不足", new Error()));
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export default {
    putProduct,
    removeProduct,
    modifyProductQuantity
};