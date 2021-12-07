import query from '../database/basic.database.js';



/** Search the orers by memberID*/
/**
 * @param  {object} user
 */
 const searchOrderByID = (user) => {
     console.log(user)
    return new Promise((resolve,reject) => {
        query('SELECT * FROM `Order` WHERE MemberID = ?', [user.id]).then((result) => {
            resolve(result); 
        }).catch((error) => {reject(error);})
    })    
};




export default 
{
    searchOrderByID
}