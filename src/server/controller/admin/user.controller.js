import userModule from "../../module/admin/user.module.js";

  const getUsers = (req, res, next) => {
    // console.log(typeof req.query["page"])
    userModule.listUser(req.query["page"]).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };

  const banUsers = (req, res, next) => {
    // console.log(typeof req.query["page"])
    userModule.banUsers(req.params.id).then((result) => {
      res.send(result); // 成功回傳result結果
    }).catch((error) => { next(error) }); // 失敗回傳錯誤訊息
  };

  export default 
  {
    getUsers,
    banUsers
  }