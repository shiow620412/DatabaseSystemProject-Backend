import userController from "../server/controller/user.controller.js" ;
import userModule from '../server/module/user.module.js ';
import {mockReq, mockRes} from 'sinon-express-mock'
import chai , {expect} from 'chai'
import sinonChai from 'sinon-chai'
import sinon from "sinon"
chai.use(sinonChai);

describe('Test register function', () => {
    it('Test the users register normally', async () => {
        const req = mockReq({
            email: "abcd@abcd.com", 
            account: "aaa", 
            password: "bbb", 
            name: "test"
        });
        const res = mockRes();
        const stubRegister = sinon.stub(userModule, "Register").resolves("註冊成功");
        userController.userRegister(req, res);
        await Promise.resolve();

        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("註冊成功");
    });
});