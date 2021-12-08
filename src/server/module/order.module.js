import query from '../database/basic.database.js';

/** Search the orers by memberID*/
/**
 * @param  {object} user
 * @param  {string} user.id
 */
 const searchOrderByID = (user, page) => {
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
 * @param  {number[]} values.price
 * @param  {number[]} values.quantity
 * @param  {string} values.date
 * @param  {number} values.orderStatus
 * @param  {number} values.paymentMethod
 * @param  {number[]} values.productID
 */
//TODO:
 const orderProduct = (user, values) => {
    let total = 0;
    values.price.forEach((num, index) => {
        total += (values.price[index]) * (values.quantity[index]);
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
                    query('UPDATE  `Product` SET Sales = Sales + ?, Stock = Stock - ? WHERE ProductID = ?',[ (values.quantity[index]), (values.quantity[index]), value]);
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
};



const deleteOrder = (user,id) =>{
    return new Promise((resolve,reject) => { 
        query('UPDATE `Order` SET OrderStatus = 2 WHERE OrderID = ? AND MemberID = ?', [id,user.id]).then((result) => {
            resolve({ 
                code: 200,
                message: '取消成功', 
            });
            query('UPDATE Product,OrderDetail SET Product.Stock = Product.Stock + OrderDetail.Quantity WHERE Product.ProductID = OrderDetail.ProductID AND OrderID = ?',[id])
            .then((result) =>{
                console.log(result)
            })  
        }).catch((error) => {reject(error);})
    })    
}
const checkOrderDetail = (user,id) =>{
    return new Promise((resolve,reject) => { 
        query('SELECT O.OrderID ,O.MemberID,O.Date,O.OrderStatus,D.ProductID,D.Quantity FROM `Order` AS O LEFT JOIN OrderDetail AS D on O.OrderID=D.OrderID WHERE O.OrderID =? AND O.MemberID =?', 
        [id,user.id]).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error);})
    })    
}

export default 
{
    searchOrderByID,
    orderProduct,
    deleteOrder,
    checkOrderDetail
}