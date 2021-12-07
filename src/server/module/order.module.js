import query from '../database/basic.database.js';

/** Add new order */
/**
 * @param  {object} order
 * @param  {string} order.memberID
 * @param  {string} order.date
 * @param  {string} order.total
 * @param  {string} order.orderstatus
 * @param  {string} order.paymentMethod
 */
const addOrder = (order) => {
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Order`(`MemberID`, `Date`, `Total`, `OrderStatus`, `PaymentMethod`) VALUES (?, ?, ?, ?, ?)',
        [order.memberID, order.date, order.total, order.orderstatus, order.paymentMethod]).then((result) => {
            resolve({
                code: 200,
                message: "新增訂單成功",
            })
        }).catch((error) => {reject(error);})             
    });
};

/** List the orders on page  */
/**
 * @param  {string} page
 */
const getOrderlist = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let maxLimit=(Number(page))*50  
        query('SELECT * FROM `Order` LIMIT ?,?', [minLimit,maxLimit]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};

/** Search the orers by memberID*/
/**
 * @param  {string} memberID
 */
const searchOrderByID = (memberID) => {
    return new Promise((resolve,reject) => {
        query('SELECT * FROM Order WHERE MemberID Like ?', [`%${memberID}%`]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })    
};

export default 
{
    getOrderlist,
    addOrder,
    searchOrderByID
}