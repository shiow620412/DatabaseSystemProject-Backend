import config from '../../../config/config.js';
import jwt from 'jsonwebtoken';
import error from '../../helper/error.js';
import query from '../../database/basic.database.js';

/*  User list   */
/**
 * @param  {string} page
 */
 const listUser = (page) => {
    return new Promise((resolve,reject) => {
        if(page===undefined)
            page=1
        let minLimit=(Number(page)-1)*50  
        query('SELECT * FROM Member  LIMIT ?,?', [minLimit,50]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);});
    })    
};

export default {
    listUser,
};