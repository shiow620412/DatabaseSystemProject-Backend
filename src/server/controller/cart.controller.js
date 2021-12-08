import cartModule from "../module/cart.module.js";

const putProduct = (req, res, next) => {
    // 放入購物車
    cartModule.putProduct(req.user, req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };
  
export default
{
    putProduct
}