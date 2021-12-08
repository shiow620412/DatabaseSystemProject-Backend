import orderModule from "../module/order.module.js";

const searchOrder = (req, res, next) => {
  orderModule.searchOrderByID(req.user, req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const createProduct = (req, res, next) => {
  // 成立訂單
  orderModule.createProduct(req.user, req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  searchOrder,
  createProduct
}