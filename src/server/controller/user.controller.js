import userModule from "../module/user.module.js";

/* User  POST 登入(Login) */
const userLogin = (req, res, next) => {
    // 取得帳密
    userModule.Login(req.body).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};
  
const getUser = (req, res, next) => {
  // console.log(typeof req.query["page"])
  userModule.listUser(req.user,req.query["page"]).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

/* User  findPassword */
const findPassword = (req, res, next) => {
  userModule.findBackPassword(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

const userRegister = (req, res, next) => {
  // 新增會員帳號
  userModule.Register(req.body).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
};

export default 
{
  userLogin,
  getUser,
  findPassword,
  userRegister
}