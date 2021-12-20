import query from '../database/basic.database.js';

/** Search the orders by memberID*/
/**
 * @param  {object} user
 * @param  {string} user.id
 */
 const searchOrderByID = (user, page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined || filterOptions.page === "")
            page = 1
        let minLimit = (Number(page)-1)*20  
        let count;
        query('SELECT COUNT(*) as _count FROM `Order` WHERE MemberID = ? ',[user.id]).then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT OrderID,Date,Total,StatusType FROM `Order` ,Payment,OrderStatus WHERE MemberID = ? and `Order`.OrderStatus = OrderStatus.OrderStatusID and `Order`.PaymentMethod = Payment.PaymentID  LIMIT ?,?', [user.id, minLimit, 20]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
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
 * @param  {string[]} values.productName
 */
 const createOrder = async(user, values) => {
    let total = 0;
    let count = 0;
    let totalPrice = await new Promise((resolve,reject) => {
        values.productID.forEach((value, index) => {
            query('SELECT Price FROM `Product` WHERE ProductID = ?', value).then(async(result) => {
                total += Number(result[0].Price) * values.quantity[index];
                count++;
                if(count===(values.productID.length)){
                    resolve(total);
                }
            }).catch((error) => {reject(error);});
        });
    })
    console.log(totalPrice);
    // let total = 0;
    // values.price.forEach((num, index) => {
    //     total += (values.price[index]) * (values.quantity[index]);
    // });
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Order` (`MemberID`,`Date`, `Total`, `OrderStatus`, `PaymentMethod`) VALUES (?, ?, ?, ?, ?)',
            [user.id, values.date, totalPrice, 3,values.paymentMethod]).then((result) => {
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

/** User delete the order */
/**
 * @param  {object} user
 * @param  {string} user.id
 */
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

/** User check the order detail */
/**
 * @param  {object} user
 * @param  {string} user.id
 */
// TODO: 需join orderStatus
const checkOrderDetail = (user,id) =>{
    return new Promise((resolve,reject) => { 
        query('SELECT DISTINCT Product.ProductName,OrderDetail.Quantity FROM OrderDetail ,Product,`Order` WHERE OrderDetail.ProductID = Product.ProductID  and Order.MemberID=? AND OrderDetail.OrderID =? ', 
        [user.id,id]).then((result) => {
            resolve(result);
        }).catch((error) => {reject(error);})
    })    
}

export default 
{
    searchOrderByID,
    createOrder,
    deleteOrder,
    checkOrderDetail
}