//import apiError from "../helper/apiError.js";
import mysql from "mysql8"
import config from "../../config/config.js";
import error from "../helper/error.js";
import query from "./basic.database.js";

function checkAdminByUserID(userID){
    return new Promise((resolve, reject) => {
        query('SELECT isAdmin FROM Member WHERE MemberID = ?', userID).then((result) => {
            resolve(result)
        }).catch((error) => {reject(error);}) 
    })
}

export default checkAdminByUserID;
