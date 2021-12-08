import query from '../database/basic.database.js';

/** Search the orers by memberID*/
/**
 * @param  {object} user
 */
 const searchOrderByID = (user, page) => {
     console.log(user)
    return new Promise((resolve,reject) => {
        if(page === undefined)
            page = 1
        let minLimit = (Number(page)-1)*20  
        query('SELECT * FROM `Order` WHERE MemberID = ? LIMIT ?,?', [user.id, minLimit, 20]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })    
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
 const orderProduct = (user, values) => {
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
export default 
{
    searchOrderByID,
    orderProduct
}