import query from '../database/basic.database.js';

/** List the products on page  */
/**
 * @param  {string} page
 */
const getProducts = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        query('SELECT * FROM Product  LIMIT ?,?', [minLimit,50]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    }) 
};

/** Search the products by name*/
/**
 * @param  {string} productName
 */
const searchProductByName = (productName, page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined)
            page = 1
        let minLimit = (Number(page)-1)*20 
        query('SELECT * FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ? LIMIT ?,?', [`%${productName}%`, minLimit, 20]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })    
};

export default 
{
    getProducts,
    searchProductByName
}