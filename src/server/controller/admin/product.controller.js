import productModule from "../../module/admin/product.module.js";

const addProduct = (req, res, next) => {
    productModule.addProduct(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const deleteProduct = (req, res, next) => {
  productModule.deleteProduct(req.params.productId).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const modifyProduct = (req, res, next) => {
  productModule.modifyProduct(req.params.productId, req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const getAllProductStatus = (req, res, next) => {
  productModule.getAllProductStatus().then((result) => {
    res.send(result);
  }).catch((error) => { 
    next(error) 
  });
};

export default
{
    addProduct,
    deleteProduct,
    modifyProduct,
    getAllProductStatus
}