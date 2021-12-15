import query from '../../database/basic.database.js';

/** List the orders on page  */
/**
 * @param  {string} page
 */
 const getOrderList = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let count;
        query('SELECT COUNT(*) as _count FROM Order ').then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT * FROM Order  LIMIT ?,?', [minLimit,50]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })
        
};

/**
 * @param  {number} id
 */
 const modifyOrder = (user, id) => {
    return new Promise((resolve,reject) => { 
        query('UPDATE `Order` SET OrderStatus = 2 WHERE OrderID = ? AND MemberID = ?', [id, user.id]).then((result) => {
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
};

export default{
    getOrderList,
    modifyOrder
}