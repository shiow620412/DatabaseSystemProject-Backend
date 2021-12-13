import query from "./basic.database.js";

function checkStockByProductID(product){
    return new Promise((resolve, reject) => {
        product.productID.forEach((value, index) => {
            query('SELECT Stock FROM Product WHERE ProductID = ?',[value]).then((result) =>{
                if(product.quantity[index] > result[0].Stock){
                    resolve(false)
                }
                else{
                    resolve(true)
                }
            }).catch((error) => {reject(error);});
        });
        
    })
}

export default checkStockByProductID;
