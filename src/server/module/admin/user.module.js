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
        let count;
        query('SELECT COUNT(*) as _count FROM Member ').then((result)=>{
            count = Number(result[0]._count);
            let numOfPage = Math.ceil(count/20);
            query('SELECT * FROM Member  LIMIT ?,?', [minLimit,50]).then((result) => {
                resolve({ 
                    result,
                    count,
                    numOfPage,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })    
};
/**
 * @param  {string} id
 */

 const banUsers = (id) => {
    return new Promise((resolve,reject) => { 
        query('Select isBan From Member Where MemberID = ?',[id]).then((result)=>{
            let ban = Number(result[0].isBan);
            if (ban === 0) {
                query('UPDATE Member SET isBan = 1  WHERE MemberID = ? ', [id]).then((result) => {
                    resolve({ 
                        code: 200,
                        message: '停權成功', 
                    });
                }).catch((error) => {reject(error);});
            }
            else{
                query('UPDATE Member SET isBan = 0  WHERE MemberID = ? ', [id]).then((result) => {
                    resolve({ 
                        code: 200,
                        message: '復權成功', 
                    });
                }).catch((error) => {reject(error);});
            }
        }).catch((error) => {reject(error);});


    })    
};

export default {
    listUser,
    banUsers
};