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
        if(page === undefined)
            page = 1
        const dataPerPage = 50;
        const minLimit=(Number(page) - 1) * dataPerPage  
        query('SELECT COUNT(*) as _count FROM Member ').then((result)=>{
            const total = Number(result[0]._count);
            const pages = Math.ceil(total / dataPerPage);
            query('SELECT * FROM Member  LIMIT ?,?', [minLimit,dataPerPage]).then((result) => {
                resolve({ 
                    result,
                    total,
                    pages,
                }); 
            }).catch((error) => {reject(error);});
        }).catch((error) => {reject(error);});
    })    
};

/**
 * @param  {string} userId
 * @param  {string} status
 */
const modifyUserStatus = (userId, status) => {
    return new Promise((resolve,reject) => { 
        const UserStatus = status === "ban" ? 1 : 0;
        query('UPDATE Member SET isBan = ? WHERE MemberID = ?', [UserStatus, userId]).then(() => {
            resolve({ 
                code: 200,
                message: UserStatus ? "停權成功" : "復權成功"
            });
        }).catch((error) => {reject(error);});
    })    
};

export default {
    listUser,
    modifyUserStatus
};