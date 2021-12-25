import query from '../../database/basic.database.js';

/** Admin hit the product on the shelf */
/**
 * @param  {object} product
 * @param  {string} product.name
 * @param  {Number} product.price
 * @param  {string} product.thumbnail
 * @param  {string} product.description
 * @param  {Number} product.type
 * @param  {Number} product.stock
 */
 const addProduct = (product) => {
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Product`(`ProductName`, `Price`, `Thumbnail`, `Description`, `Sales` , `Type`, `Stock`, `OnShelf`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )',
        [product.name, product.price, product.thumbnail, product.description, 0, product.type, product.stock, "Yes"]).then(() => {
            resolve({
                code: 200,
                message: "商品上架成功",
            })
        }).catch((error) => {reject(error);})             
    });t
};

/**
 * @param  {string} productId
 */
const deleteProduct = (productId) => {
    return new Promise((resolve,reject) => {
<<<<<<< HEAD
        query('SELECT * FROM Product WHERE ProductID = ?',[id]).then((result) =>{
            var queryonshelf = result[0].OnShelf;
            if(queryonshelf === 'Yes'){
                query('UPDATE Product SET OnShelf = "No" WHERE ProductID = ? ',[id]).then((result) =>{
                        resolve('成功將商品下架');
                }).catch((error) =>{reject(error); });

            }else if(queryonshelf === 'No'){
                resolve('商品已被下架');
            }else{
                resolve('商品不存在，請更改商品ID');
            }
        }).catch((error) =>{reject(error); });
=======
        const shelfStatus = "No";

        query('UPDATE  `Product` SET OnShelf = ? WHERE ProductID = ?',
        [shelfStatus,productId]).then(() => {
            resolve({
                code: 200,
                message: "商品下架成功",
            })
        }).catch((error) => {reject(error);})             
>>>>>>> main
    });
}

/**
 * @param  {string} id
 * @param  {object} values
 * @param  {Number} values.price
 * @param  {string} values.thumbnail
 * @param  {string} values.description
 * @param  {Number} values.stock
 */
 const modifyProduct = (id, values) => {
    return new Promise((resolve,reject) => {
        query('UPDATE  `Product` SET Price = ?, Thumbnail = ?, Description = ?, Stock = ? WHERE ProductID = ?',
        [values.price, values.thumbnail, values.description, values.stock, id]).then(() => {
            resolve({
                code: 200,
                message: "商品資訊更新成功",
            })
        }).catch((error) => {reject(error);})             
    });
};

export default
{
    addProduct,
    deleteProduct,
    modifyProduct
}
