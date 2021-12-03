import error from '../helper/error.js';
import query from '../database/basic.database.js';

/*  Order list   */
/**
 * @param  {string} page
 */
const getOrderlist = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        let maxLimit=(Number(page))*50  
        query('SELECT * FROM TransactionRecord LIMIT ?,?', [minLimit,maxLimit]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })
        
};



export default 
{
    getOrderlist,
}