import query from "./basic.database.js";

async function checkStockByProductID(product){
    return new Promise((resolve, reject) => {
        product.productID.forEach(async (value, index) => {
            await query('SELECT Stock FROM Product WHERE ProductID = ?',[value]).then((result) =>{
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
