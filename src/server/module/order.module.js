import query from '../database/basic.database.js';

/** List the orders on page  */
/**
 * @param  {string} page
 */
const getOrderlist = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let maxLimit=(Number(page))*50  
        query('SELECT * FROM `Order` LIMIT ?,?', [minLimit,maxLimit]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};

export default 
{
    getOrderlist,
}