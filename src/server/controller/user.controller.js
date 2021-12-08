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

export default 
{
  userLogin,
  findPassword,
  userRegister
}
