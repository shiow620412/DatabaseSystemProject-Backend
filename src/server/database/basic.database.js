//import apiError from "../helper/apiError.js";
import mysql from "mysql8"
import config from "../../config/config.js";
import error from "../helper/error.js";
const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});
function query(queryString, queryParameter){
    return new Promise( (resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
            if (connectionError) {                
                reject(connectionError); 
            } else {

                connection.query( 
                    queryString,
                    Array.isArray(queryParameter) ? queryParameter : [queryParameter], 
                    (_error, result) => {
                        if (_error) {
                            reject(error.MySQLError("Backend Error"),new Error()); 
                        } else {
                            resolve(result);
                        }
                        connection.release();
                    }
                );
            }
        })
    })
}

export default query;