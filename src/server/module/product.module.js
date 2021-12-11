import query from '../database/basic.database.js';

/** List the products on page  */
/**
 * @param  {string} page
 */
const getProducts = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*20  
        let count;
        query('SELECT COUNT(*) as _count FROM Product WHERE OnShelf = "Yes" ').then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT * FROM Product WHERE OnShelf = "Yes" LIMIT ?,?', [minLimit,20]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
        
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
        let count;
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ? AND OnShelf = "Yes" ',[`%${productName}%`,]).then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT ProductName,Price,Stock,TypeName FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ? AND OnShelf = "Yes" LIMIT ?,?', [`%${productName}%`,minLimit,20]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })    
};

const getProductDetail = (id) => {
    console.log(id)
    return new Promise((resolve,reject) => {
        query('SELECT * FROM `Product` WHERE ProductID = ?',[id]).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};

const rankProductBySales = () => {
    return new Promise((resolve,reject) => {
        query('SELECT * FROM `Product` ORDER BY Sales DESC',).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};

/**
 * @param  {string} productName
 */
const countProductByCategory = (productName) => {
    return new Promise((resolve,reject) => {
        console.log(productName)
        query(`SELECT TypeName,count(*) as quantity FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName LIKE ? GROUP BY TypeName`,
        [`%${productName}%`]).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};

export default 
{
    getProducts,
    searchProductByName,
    getProductDetail,
    rankProductBySales,
    countProductByCategory
}