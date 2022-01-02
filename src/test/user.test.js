import pkg from 'body-parser';
//import userrouter from "../../src/server/route/user.route.js";
import userModule from "../../src/server/module/user.module.js";
import { createRequire } from "module";
import { isTypedArray } from 'util/types';
import userController from '../server/controller/user.controller.js';
import { setUncaughtExceptionCaptureCallback } from 'process';

const { json } = pkg;
const require = createRequire(import.meta.url);
const sinon = require("sinon");

/*
const mockRequest = (data) => {
    return {
        data: data
    }
}
*/
/*
const mockResponse = () => {
    const res = {};
    res.json = sinon.stub().returns(res);
    return res;
}
*/

//const apiServiceLogin = sinon.stub(userController, "userLogin")
describe("[登入功能]", () => {
    it("登入成功", async () => {
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }
        const req = {
            body:{account:"admin", password:"12345"}
        }
        const next = sinon.stub();
        const stubvalue = {
            account:"admin"
        }
        const apiServiceLogin = sinon.stub(userController, "userLogin").resolves(stubvalue);
        //apiServiceLogin.withArgs("admin","12345").resolves({
        //    status: 201
        //})
        userModule.Login(req.body, res, next);
      
        sinon.assert.calledWithExactly(
            apiServiceLogin, 
        );
        sinon.assert.calledWithExactly(res.status, 201);
        sinon.assert.calledWithExactly(res.json, { status: 201, data: { name: 'admin' } });
    })
    it("登入錯誤", async () => {
        const req = mockRequest("admin", "12345")
        const res = mockResponse();
        apiServiceLogin.withArgs("123").resolves({
            status: 999
        })
        userModule.Login(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})