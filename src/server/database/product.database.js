import query from "./basic.database.js";

async function checkStockByProductID(product) {
    return new Promise((resolve, reject) => {
        let count= 0;
        product.productID.forEach(async (value, index) => {
            await query('SELECT Stock FROM Product WHERE ProductID = ?', [value]).then((result) => {
                if (product.quantity[index] > result[0].Stock) {
                    resolve(false);
                } 
                else{
                    count++;
                    if(count===(product.productID.length)){
                        resolve(true);
                    }
                }
            }).catch((error) => {
                reject(error);
            });
        });

        


    })
}

/**
 * @param  {string} getProductsSql
 * @param  {object} filterOptions
 * @param  {string} filterOptions.filter
 * @param  {string} filterOptions.sort
 * @param  {Number} filterOptions.minPrice
 * @param  {Number} filterOptions.maxPrice
 * @param  {string} filterOptions.page
 * @param  {object} dictionaryCondition
 * @param  {string[]} dictionaryCondition.expressions
 * @param  {string[]} dictionaryCondition.parameters
 */
function filterProducts(getProductsSql, filterOptions, dictionaryCondition) {
    return new Promise((resolve, reject) => {
        console.log(getProductsSql);
        console.log(filterOptions);
        const expectFilter = ["sales", "stock", "productid"]
        const expectSort = ["DESC", "ASC"]
        let sql = getProductsSql;
        console.log(sql);
        let orderBy = []
        if (filterOptions.filter && expectFilter.indexOf(filterOptions.filter.toLocaleLowerCase()) !== -1) {
            orderBy.push(filterOptions.filter + " DESC");
        }
        if (filterOptions.sort && expectSort.indexOf(filterOptions.sort.toLocaleUpperCase()) !== -1) {
            orderBy.push("Price " + filterOptions.sort);
        }
        if (filterOptions.minPrice && !Number.isNaN(filterOptions.minPrice)) {
            dictionaryCondition.expressions.push("Price >= ?");
            dictionaryCondition.parameters.push(filterOptions.minPrice)
            // sql += ` AND Price >= ${filterOptions.minPrice}`;
        }
        if (filterOptions.maxPrice && !Number.isNaN(filterOptions.maxPrice)) {
            dictionaryCondition.expressions.push("Price <= ?");
            dictionaryCondition.parameters.push(filterOptions.maxPrice)
            // sql += ` AND Price <= ${filterOptions.maxPrice}`;
        }
        sql += " WHERE " + dictionaryCondition.expressions.join(" AND ")
        if (orderBy.length > 0) {
            sql += " ORDER BY " + orderBy.join(",");
        }
        if(filterOptions.page === undefined || filterOptions.page === ""){
            filterOptions.page = 1;
        }
        


        console.log(sql);
        const countSql = sql.replace("Thumbnail,ProductName,Price,ProductID","count(*) as count");
        query(countSql, dictionaryCondition.parameters).then((result) => {
            const dataPerPage = 20
            const minLimit = (Number(filterOptions.page) - 1) * dataPerPage
            const total = Number(result[0].count);
            const pages = Math.ceil(total / dataPerPage);
            sql += ` Limit ${String(minLimit)}, ${dataPerPage}`;
            query(sql, dictionaryCondition.parameters).then((result) => {
                resolve({
                    result,
                    total,
                    pages
                });
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        })
     
    })
   

}

export default {
    checkStockByProductID,
    filterProducts
}