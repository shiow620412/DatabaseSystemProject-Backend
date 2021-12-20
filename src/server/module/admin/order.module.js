import query from '../../database/basic.database.js';
import error from '../../helper/error.js';

/** List the orders on page  */
/**
 * @param  {string} page
 */
 const getOrderList = (page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined)
            page = 1
        const dataPerPage = 50
        const minLimit = (Number(page) - 1) * dataPerPage ;
        query('SELECT COUNT(*) as _count FROM `Order` ').then((result)=>{
            const total = Number(result[0]._count);
            const pages = Math.ceil(total / dataPerPage);
            query('SELECT * FROM `Order`  LIMIT ?,?', [minLimit, dataPerPage]).then((result) => {
                resolve({ 
                    result,
                    total,
                    pages,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })
        
};

 /**
  * @param  {string} orderId
  */
 const cancelOrder = (orderId) => {
    return new Promise((resolve,reject) => { 
        query('UPDATE `Order` SET OrderStatus = 2 WHERE OrderID = ? AND OrderStatus != 2', [orderId]).then((result) => {
            if(result.affectedRows > 0 ){
                query('UPDATE Product,OrderDetail SET Product.Stock = Product.Stock + OrderDetail.Quantity WHERE Product.ProductID = OrderDetail.ProductID AND OrderID = ?',[orderId])
                .then(() =>{
                    resolve({ 
                        code: 200,
                        message: '取消成功', 
                    });
                })  
            }else{
                reject(error.APIError("取消失敗", new Error()))
            }
        }).catch((error) => {reject(error);})
    })     
};

export default{
    getOrderList,
    cancelOrder
}