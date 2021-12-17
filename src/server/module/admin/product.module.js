import query from '../../database/basic.database.js';

/** Admin hit the product on the shelf */
/**
 * @param  {object} product
 * @param  {string} product.name
 * @param  {string} product.price
 * @param  {string} product.thumbnail
 * @param  {string} product.description
 * @param  {string} product.type
 * @param  {string} product.stock
 */
 const addProduct = (product) => {
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Product`(`ProductName`, `Price`, `Thumbnail`, `Description`, `Sales` , `Type`, `Stock`, `OnShelf`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )',
        [product.name, product.price, product.thumbnail, product.description, 0, product.type, product.stock, "Yes"]).then((result) => {
            resolve({
                code: 200,
                message: "商品上架成功",
            })
        }).catch((error) => {reject(error);})             
    });
};

/**
 * @param  {string} id
 */
const deleteProduct = (id) => {
    return new Promise((resolve,reject) => {
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
    });
}

/**
 * @param  {string} id
 * @param  {object} values
 * @param  {number} values.price
 * @param  {string} values.thumbnail
 * @param  {string} values.description
 * @param  {number} values.stock
 */
 const modifyProduct = (id, values) => {
    return new Promise((resolve,reject) => {
        query('UPDATE  `Product` SET Price = ?, Thumbnail = ?, Description = ?, Stock = ? WHERE ProductID = ?',
        [values.price, values.thumbnail, values.description, values.stock, id]).then((result) => {
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
