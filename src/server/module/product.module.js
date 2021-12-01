import error from '../helper/error.js';
import query from '../database/basic.database.js';

/**
 * @param  {object} product
 * @param  {string} product.name
 * @param  {string} product.price
 * @param  {string} product.thumbnail
 * @param  {string} product.describe
 * @param  {string} product.type
 * @param  {string} product.stock
 */
const addProduct = (product) => {
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

/*  Product list   */
/**
 * @param  {string} page
 */
const getProducts = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let maxLimit=(Number(page))*50  
        query('SELECT * FROM Product  LIMIT ?,?', [minLimit,maxLimit]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};
/**
 * @param  {string} productName
 */
const searchProductByName = (productName) => {
    return new Promise((resolve,reject) => {
        query('SELECT * FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ?', [`%${productName}%`]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};


export default 
{
    addProduct,
    getProducts,
    searchProductByName
}