
const mockRequest = (data) => {
  return {
      body: data
  }
}
const mockResponse = () => {
  const res = {};
  res.json = sinon.stub().returns(res);
  return res;
}
const sinon = require("sinon");
const { default: userController } = require("../server/controller/user.controller");


const apiServiceLogin = sinon.stub(userController, "userLogin")
describe("[登入功能]", () => {
    beforeEach(() => {
        apiServiceLogin.reset()
    })
    it("登入成功", async () => {
        const req = mockRequest({
            username: "123",
        })
        const res = mockResponse();
        apiServiceLogin.withArgs("123").resolves({
            status: 0
        })
        await authController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("登入錯誤", async () => {
        const req = mockRequest({
            username: "123",
        })
        const res = mockResponse();
        apiServiceLogin.withArgs("123").resolves({
            status: 999
        })
        await authController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})
