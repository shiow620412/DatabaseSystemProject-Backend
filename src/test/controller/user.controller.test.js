import userController from "../server/controller/user.controller.js" ;
import userModule from '../server/module/user.module.js ';
import {mockReq, mockRes} from 'sinon-express-mock'
import chai , {expect} from 'chai'
import sinonChai from 'sinon-chai'
import sinon from "sinon"
chai.use(sinonChai);

describe('Test users register in user controller', () => {
    let stubRegister = sinon.stub(userModule, "Register");
    beforeEach(() => {
        stubRegister.reset();
    })

    it('Test the users register normally', async () => {
        const req = mockReq();
        const res = mockRes();
        stubRegister.resolves("註冊成功");
        userController.userRegister(req, res);
        await Promise.resolve();

        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("註冊成功");
    });

    it('Test the users can not register when the email exists ', async () => {
        const req = mockReq({
            email: "test123@gmail.com", 
            account: "ccc", 
            password: "bbb", 
            name: "test"
        });
        const res = mockRes();
        stubRegister.resolves("註冊失敗");
        userController.userRegister(req, res);
        await Promise.resolve();

        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWithExactly("註冊失敗");
    });

    it('Test the users can not register when the account exists ', async () => {
        const req = mockReq({
            email: "test456@gmail.com", 
            account: "admin", 
            password: "bbb", 
            name: "test"
        });
        const res = mockRes();
        stubRegister.resolves("註冊失敗");
        userController.userRegister(req, res);
        await Promise.resolve();

        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWithExactly("註冊失敗");
        console.log(res.send);
        console.log(stubRegister);
        console.log(Promise.resolve());
    });
    
});
