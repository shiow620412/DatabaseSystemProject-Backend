import query from '../database/basic.database.js';
import filterProducts from '../database/product.database.js'

/** List the products in type on page  */
 /**
  * @param  {number} type
  * @param  {number} _page
  * @param  {string} _filter
  * @param  {string} _sort
  * @param  {number} _maxPrice
  * @param  {number} _minPrice
  */
const getProducts = (type, _page,_filter,_sort,_maxPrice,_minPrice) => {
    return new Promise((resolve,reject) => {
        let count;
        const filterOptions={
            filter:_filter,
            sort:_sort,
            minPrice:_minPrice,
            maxPrice:_maxPrice,
            page:_page
        }       
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE Type.TypeID = ? AND OnShelf = "Yes" ',[type]).then(async (result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            let getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM Product WHERE Product.Type = '+String(type)+' AND OnShelf = "Yes"';
            let filterResult = await filterProducts.filterProducts(getProductsSql,filterOptions);
            console.log(filterResult);
            resolve({ 
                filterResult,
                count,
                numOfPage,
            });
        }).catch((error) => {reject(error);});
    })    
};

/** Search the products by name*/
/**
  * @param  {string} productName
  * @param  {number} _page
  * @param  {string} _filter
  * @param  {string} _sort
  * @param  {number} _maxPrice
  * @param  {number} _minPrice
 */
const searchProductByName = (productName, _page,_filter,_sort,_maxPrice,_minPrice) => {
    return new Promise((resolve,reject) => {
        let count;
        const filterOptions={
            filter:_filter,
            sort:_sort,
            minPrice:_minPrice,
            maxPrice:_maxPrice,
            page:_page
        }       
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE ProductName Like ? AND OnShelf = "Yes" ',[`%${productName}%`]).then(async(result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            let getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM Product WHERE ProductName Like "%'+String(productName)+'%" AND OnShelf = "Yes"';
            let filterResult = await filterProducts.filterProducts(getProductsSql,filterOptions);
            console.log(filterResult);
            resolve({ 
                filterResult,
                count,
                numOfPage,
            });
        }).catch((error) => {reject(error);});
    })    
};
/**
 * @param  {string} id
 */
const getProductDetail = (id) => {
    console.log(id)
    return new Promise((resolve,reject) => {
        query('SELECT Thumbnail ,ProductName,Price,Stock,Description FROM `Product` WHERE ProductID = ?',[id]).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);})             
    });
};

 /**
  * @param  {number} _page
  * @param  {string} _filter
  * @param  {string} _sort
  * @param  {number} _maxPrice
  * @param  {number} _minPrice
  */
const rankProductBySales = (_page,_sort,_maxPrice,_minPrice) => {
    return new Promise((resolve,reject) => {
        let count;
        const filterOptions={
            filter:"Sales",
            sort:_sort,
            minPrice:_minPrice,
            maxPrice:_maxPrice,
            page:_page
        }
        console.log(filterOptions);
        query('SELECT COUNT(*) as _count FROM Product WHERE OnShelf = "Yes" ').then(async (result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            let getProductsSql = 'SELECT Thumbnail,ProductName,Price,ProductID FROM `Product` WHERE OnShelf = "Yes"';
            console.log(getProductsSql);
            let filterResult = await filterProducts.filterProducts(getProductsSql,filterOptions);
            console.log(filterResult);
            resolve({ 
                filterResult,
                count,
                numOfPage,
            });
        }).catch((error) => {reject(error);});     
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


const searchProductInAll = (productName, _page,_filter,_sort,_maxPrice,_minPrice) => {
    return new Promise((resolve,reject) => {
        const filterOptions={
            filter:_filter,
            sort:_sort,
            minPrice:_minPrice,
            maxPrice:_maxPrice,
            page:_page
        }       
        let count;
        query('SELECT COUNT(*) as _count FROM Product LEFT JOIN Type on Type = TypeID WHERE  ProductName LIKE ? AND OnShelf = "Yes" ',[`%${productName}%`]).then(async(result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            let getProductsSql = 'SELECT ProductName,Price,Sales,Stock,TypeName,Description FROM Product LEFT JOIN Type on Product.Type = Type.TypeID WHERE ProductName Like "%'+String(productName)+'%" AND OnShelf = "Yes"';
            let filterResult = await filterProducts.filterProducts(getProductsSql,filterOptions);
            console.log(filterResult);
            resolve({ 
                filterResult,
                count,
                numOfPage,
            });
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