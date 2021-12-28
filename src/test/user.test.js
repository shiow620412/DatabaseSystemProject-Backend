import pkg from 'body-parser';
import userController from "../server/controller/user.controller.js";
import user from "../server/route/user.route.js";
import { createRequire } from "module";

const { json } = pkg;
const require = createRequire(import.meta.url);
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

const sinon = require('sinon');
// describe ('userModule', () => {
    
// });
describe('Test register function', () => {
    it('Test the users register normally', () => {
        const req = mockRequest({
            email: "abcd@abcd.com", 
            account: "aaa", 
            password: "bbb", 
            name: "test"
        })
        const res = mockResponse();
        sinon.stub(user.prototype, "register").withArgs("register").resolves();
        const result = userController.userRegister(req, res);
        console.log(result);
        sinon.assert.calledWith(res.json, {
            message: "註冊成功",
        })
        sinon.assert.calledOnce(res.json);
    });   
});

// import pkg from 'body-parser';
// //import userrouter from "../../src/server/route/user.route.js";
// import userModule from "../../src/server/module/user.module.js";
// import { createRequire } from "module";
// import { isTypedArray } from 'util/types';
// import userController from '../server/controller/user.controller.js';

// const { json } = pkg;
// const require = createRequire(import.meta.url);
// const sinon = require("sinon");
// const mockRequest = (data, data1) => {
//     return {
//         account: data,
//         password:data1
//     }
// }
// const mockResponse = () => {
//     const res = {};
//     res.json = sinon.stub().returns(res);
//     return res;
// }

// const apiServiceLogin = sinon.stub(userController, "userLogin")
// describe("[登入功能]", () => {
//     beforeEach(() => {
//         apiServiceLogin.reset()
//     })
//     it("登入成功", async () => {
//         const req = mockRequest("admin", "12345")
//         const res = mockResponse();
//         apiServiceLogin.withArgs("123").resolves({
//             status: 0
//         })
//         await userModule.Login(req, res)
//         sinon.assert.calledWith(res.json, {
//             message: "登入成功",
//         });
//         sinon.assert.calledOnce(res.json);
//     })
//     it("登入錯誤", async () => {
//         const req = mockRequest("admin", "12345")
//         const res = mockResponse();
//         apiServiceLogin.withArgs("123").resolves({
//             status: 999
//         })
//         await userModule.Login(req, res)
//         sinon.assert.calledWith(res.json, {
//             message: "登入失敗",
//         });
//         sinon.assert.calledOnce(res.json);
//     })
// })


