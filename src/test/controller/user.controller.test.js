import userController from "../../server/controller/user.controller.js";
import userModule from '../../server/module/user.module.js';
import {mockReq, mockRes} from 'sinon-express-mock';
import chai , {expect} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from "sinon";
chai.use(sinonChai);

describe('Test users register in user controller ', () => {
    let stubRegister = sinon.stub(userModule, "Register");
    beforeEach(() => {
        stubRegister.reset();
    })

    it('Test the users register successfully', async () => {        
        const req = mockReq();
        const res = mockRes();
        stubRegister.resolves("註冊成功");
        userController.userRegister(req, res);
        await Promise.resolve();

        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("註冊成功");
    });

    it('Test the users register failure', async () => {
        const req = mockReq();
        const res = mockRes();
        stubRegister.resolves("註冊失敗");
        userController.userRegister(req, res);
        await Promise.resolve();
        
        expect(stubRegister).to.have.been.calledOnce;
        expect(res.send).to.be.calledWithExactly("註冊失敗");
    });

});

describe('Test users login in user controller', () => {
    let stubLogin = sinon.stub(userModule, "Login");
    beforeEach(() => {
        stubLogin.reset();
    })

    it('Test the users login successfully', async () => {
        const req = mockReq();
        const res = mockRes();
        stubLogin.resolves("登入成功");
        userController.userLogin(req, res);
        await Promise.resolve();

        expect(stubLogin).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("登入成功");
    });

    it('Test the users login failure with wrong password', async () => {
        const req = mockReq();
        const res = mockRes();
        stubLogin.resolves("輸入的密碼有誤");
        userController.userLogin(req, res);
        await Promise.resolve();

        expect(stubLogin).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("輸入的密碼有誤");
    });

    it('Test the users register failure when account does not exist', async () => {
        const req = mockReq();
        const res = mockRes();
        stubLogin.resolves("輸入的帳號不存在");
        userController.userLogin(req, res);
        await Promise.resolve();

        expect(stubLogin).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("輸入的帳號不存在");
    });


});

describe('Test users credit card function', () => {
    let stubAddCard = sinon.stub(userModule, "addCreditCard");
    beforeEach(() => {
        stubAddCard.reset();
    })

    it('Test the users add credit card successfully', async () => {
        const req = mockReq();
        const res = mockRes();
        stubAddCard.resolves("新增成功");
        userController.addCreditCard(req, res);
        await Promise.resolve();

        expect(stubAddCard).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("新增成功");
    });

    it('Test the users add credit card Failure', async () => {
        const req = mockReq();
        const res = mockRes();
        stubAddCard.resolves("新增失敗");
        userController.addCreditCard(req, res);
        await Promise.resolve();
        expect(stubAddCard).to.have.been.calledOnce;
        expect(res.send).to.be.calledWith("新增失敗");
    });


});