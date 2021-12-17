import productModule from "../module/product.module.js";

const getProducts = (req, res, next) => {
  productModule.getProducts(req.params.type,req.query["page"],req.query["filter"],req.query["sort"],req.query["maxPrice"],req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const searchProductByName = (req, res, next) => {
  productModule.searchProductByName(req.query["productName"], req.query["page"],req.query["filter"],req.query["sort"],req.query["maxPrice"],req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getProductDetail = (req, res, next) => {
  productModule.getProductDetail(req.params.id).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const rankProductBySales = (req, res, next) => {
  productModule.rankProductBySales(req.query["page"],req.query["sort"],req.query["maxPrice"],req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const countProductByCategory = (req, res, next) => {
  productModule.countProductByCategory(req.query["productName"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
const searchProductInAll = (req, res, next) => {
  productModule.searchProductInAll(req.query["productName"], req.query["page"],req.query["filter"],req.query["sort"],req.query["maxPrice"],req.query["minPrice"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

//
const searchByName = (req, res, next) =>{
  productModule.searchByName(req.query["productName"]).then((result) => {
    res.send(result);
  }).catch((error) => { next(error) });
};

export default 
{
  getProducts,
  searchProductByName,
  getProductDetail,
  rankProductBySales, 
  countProductByCategory,
  searchProductInAll
}