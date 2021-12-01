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

/*  Product list   */
const listProduct = (page) => {
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

const searchProductByName = (productName) => {
    return new Promise((resolve,reject) => {
        query('SELECT * FROM Product  WHERE ProductName = ?', [productName]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};


export default 
{
    insertProduct,
    listProduct,
    searchProductByName
}