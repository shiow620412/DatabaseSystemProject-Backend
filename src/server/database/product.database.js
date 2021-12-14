import query from "./basic.database.js";

async function checkStockByProductID(product){
    return new Promise((resolve, reject) => {
        product.productID.forEach(async (value, index) => {
            await query('SELECT Stock FROM Product WHERE ProductID = ?',[value]).then((result) =>{
                if(product.quantity[index] > result[0].Stock){
                    resolve(false)
                }
                else{
                    resolve(true)
                }
            }).catch((error) => {reject(error);});
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
 * @param  {Number} filterOptions.page
 */
function filterProducts(getProductsSql, filterOptions){
    const expectFilter = ["sales", "stock", "id"]
    const expectSort = ["DESC", "ASC"]
    let sql = getProductsSql;
    let orderBy = []
    if(filterOptions.filter && expectFilter.indexOf(filterOptions.filter.toLocaleLowerCase()) !== -1){        
        orderBy.push(filterOptions.filter + " DESC");
    }
    if(filterOptions.sort && expectSort.indexOf(filterOptions.filter.toLocaleLowerCase()) !== -1){
        orderBy.push("Price " + filterOptions.sort);
    }
    if(filterOptions.minPrice && !Number.isNaN(filterOptions.minPrice)){
        sql += ` AND Price >= ${filterOptions.minPrice}`;
    }
    if(filterOptions.minPrice && !Number.isNaN(filterOptions.minPrice)){
        sql += ` AND Price <= ${filterOptions.maxPrice}`;
    }

    if(orderBy.length > 0 ){
        sql += "ORDER BY " + orderBy.join(",");
    }

    query(sql).then((result) => {
        //....
    });

}

export default {
    checkStockByProductID,
    filterProducts   
}
