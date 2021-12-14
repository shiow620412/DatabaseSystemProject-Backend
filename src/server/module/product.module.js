import query from '../database/basic.database.js';

/** List the products in type on page  */
 const getProducts = (type, page) => {
    return new Promise((resolve,reject) => {
        if(page === undefined)
            page = 1
        let minLimit = (Number(page)-1)*20 
        let count;
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE Type.TypeID = ? AND OnShelf = "Yes" ',[type]).then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT Thumbnail,ProductName,Price,ProductID FROM Product  WHERE Product.Type = ? AND OnShelf = "Yes" LIMIT ?,?', [type,minLimit,20]).then((result) => {
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
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ? AND OnShelf = "Yes" ',[`%${productName}%`]).then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT Thumbnail ,ProductName,Price,ProductID FROM Product WHERE ProductName Like ? AND OnShelf = "Yes" LIMIT ?,?', [`%${productName}%`,minLimit,20]).then((result) => {
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
        query('SELECT Thumbnail ,ProductName,Price,Stock,Description FROM `Product` WHERE ProductID = ?',[id]).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};

const rankProductBySales = () => {
    return new Promise((resolve,reject) => {
        query('SELECT Thumbnail,ProductName,Price,ProductID FROM `Product` ORDER BY Sales DESC',).then((result) => {
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


const searchProductInAll = (productName, page) => {
    return new Promise((resolve,reject) => {
        console.log(productName);
        console.log(page);
        if(page === undefined)
            page = 1
        let minLimit = (Number(page)-1)*20 
        let count;
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE  ProductName LIKE ? AND OnShelf = "Yes" ',[`%${productName}%`]).then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT ProductName,Price,Sales,Stock,TypeName,Description FROM Product LEFT JOIN Type on Product.Type = Type.TypeID WHERE  ProductName LIKE ? AND OnShelf = "Yes" LIMIT ?,?', [`%${productName}%`,minLimit,20]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })      
};

export default 
{
    getProducts,
    searchProductByName,
    getProductDetail,
    rankProductBySales,
    countProductByCategory,
    searchProductInAll
}