import error from '../helper/error.js';
import query from '../database/basic.database.js';


const insertProduct = (product) => {
    return new Promise((resolve,reject) => {
        query('INSERT INTO `Product`(`ProductName`, `Price`, `Thumbnail`, `Introduce`, `Sales` ,`Type` , `Stock`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [product.name, product.price, product.thumbnail, product.describe, 0, product.type, product.stock]).then((result) => {
            resolve({
                code: 200,
                message: "商品上架成功",
            })
        }).catch((error) => {reject(error);})             
    });
};


export default 
{
    insertProduct
}