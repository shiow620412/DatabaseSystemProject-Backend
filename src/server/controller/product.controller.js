import productModule from "../module/product.module.js";

const getProducts = (req, res, next) => {
  productModule.getProducts(req.query["page"],req.query["price"],req.query["stock"],req.query["id"],req.query["sales"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const searchProduct = (req, res, next) => {
  productModule.searchProductByName(req.query["productName"], req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getProductDetail = (req, res, next) => {
  productModule.getProductDetail(req.params.id).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const rankProductBySales = (req, res, next) => {
  productModule.rankProductBySales(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const countProductByCategory = (req, res, next) => {
  productModule.countProductByCategory(req.query["productName"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  getProducts,
  searchProduct,
  getProductDetail,
  rankProductBySales, 
  countProductByCategory
}