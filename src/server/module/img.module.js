import query from '../database/basic.database.js';
import multer from 'multer';
import imgur from 'imgur-node-api';
const upload = multer({ dest: 'temp/' })
const imgur_CLIENT_ID = "df0e1d6a465c8dc"

//把得到的網址放入資料庫中
/** 
 * @param {string} imgLink
*/
const uplaodImg = (imgLink)=> {
    query('INSERT INTO')
}
export default
{
    uplaodImg
}