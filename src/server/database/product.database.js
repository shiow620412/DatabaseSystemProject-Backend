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
 * @param  {Number} filterOptions.page
 */
async function filterProducts(getProductsSql, filterOptions) {
    let p = await new Promise((resolve, reject) => {
        console.log(getProductsSql);
        console.log(filterOptions);
        const expectFilter = ["sales", "stock", "productid"]
        const expectSort = ["desc", "asc"]
        let sql = getProductsSql;
        console.log(sql);
        let orderBy = []
        if (filterOptions.filter && expectFilter.indexOf(filterOptions.filter.toLocaleLowerCase()) !== -1) {
            orderBy.push(filterOptions.filter + " DESC");
        }
        if (filterOptions.sort && expectSort.indexOf(filterOptions.sort.toLocaleLowerCase()) !== -1) {
            orderBy.push("Price " + filterOptions.sort);
        }
        if (filterOptions.minPrice && !Number.isNaN(filterOptions.minPrice)) {
            sql += ` AND Price >= ${filterOptions.minPrice}`;
        }
        if (filterOptions.minPrice && !Number.isNaN(filterOptions.minPrice)) {
            sql += ` AND Price <= ${filterOptions.maxPrice}`;
        }

        if (orderBy.length > 0) {
            sql += " ORDER BY " + orderBy.join(",");
        }
        if(filterOptions.page===undefined){
            filterOptions.page=1;
        }
        let minLimit = (Number(filterOptions.page)-1)*20
        sql += " Limit "+String(minLimit)+",20";


        console.log(sql);


        query(sql).then((result) => {

            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    })
    console.log(p);
    return p;

}

export default {
    checkStockByProductID,
    filterProducts
}