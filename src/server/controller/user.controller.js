import userModule from "../module/user.module.js";

/* User  POST 登入(Login) */
const userLogin = (req, res, next) => {
    // 取得帳密
    userModule.Login(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
  
/* User  findPassword */
const findPassword = (req, res, next) => {
  userModule.findBackPassword(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** User register */
const userRegister = (req, res, next) => {
  userModule.Register(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** User add credit card */
const addCredictCard = (req, res, next) => {
  userModule.addCredictCard(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
/** List User's credit card */
const findCredictCard = (req, res, next) => {
  userModule.findCredictCard(req.user,req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** delete User's credit card */
const deleteCreditCard = (req, res, next) => {
  userModule.deleteCreditCard(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** modify User's information */
const modfiyInformation = (req, res, next) => {
  userModule.modfiyInformation(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/** modfiy User's password */
const modfiyPassword = (req, res, next) => {
  userModule.modfiyPassword(req.user,req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  userLogin,
  findPassword,
  userRegister,
  addCredictCard,
  findCredictCard,
  deleteCreditCard,
  modfiyInformation,
  modfiyPassword
}
