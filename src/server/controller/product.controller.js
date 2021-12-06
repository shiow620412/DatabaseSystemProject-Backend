import productModule from "../module/product.module.js";

const addProduct = (req, res, next) => {
    productModule.addProduct(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getProducts = (req, res, next) => {
  // console.log(typeof req.query["page"])
  productModule.getProducts(req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const searchProduct = (req, res, next) => {
  productModule.searchProductByName(req.query["productName"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  addProduct,
  getProducts,
  searchProduct
}