import orderModule from "../module/order.module.js";

const getOrder = (req, res, next) => {
  orderModule.getOrderlist(req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  getOrder,
}