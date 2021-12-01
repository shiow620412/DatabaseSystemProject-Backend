import productModule from "../module/product.module.js";

const addProduct = (req, res, next) => {
    productModule.insertProduct(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };
  export default 
  {

      addProduct
  }