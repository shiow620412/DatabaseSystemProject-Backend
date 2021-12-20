import orderModule from "../../module/admin/order.module.js";

const getOrders = (req, res, next) => {
  orderModule.getOrderList(req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const cancelOrder = (req, res, next) => {
  orderModule.cancelOrder(req.params.id).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default{
  getOrders,
  cancelOrder
}