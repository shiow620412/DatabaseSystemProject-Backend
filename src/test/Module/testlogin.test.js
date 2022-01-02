//import { IM_A_TEAPOT } from 'http-status';
import pkg from 'body-parser';
import userModule from '../../server/module/user.module.js';
import { createRequire } from "module";
import database from '../../server/database/basic.database.js';
const { json } = pkg;
const require = createRequire(import.meta.url);
const sinon = require("sinon");
const {expect} = require("chai");

//const { IM_A_TEAPOT } = pkg;
describe("login test", () =>{
    afterEach(() => {
        sinon.restore();
    });
    it("should pass", async() => {
        const connStub = { a: sinon.stub().resolves({ rowCount: 1}), release: sinon.stub()};
        const poolStub = { getConnection: sinon.stub().resolves(connStub)};
        sinon.stub(database, "getPool").resolves(poolStub);
        const actual = await userModule.Login({account:"admin", password:"12345"});
        expect(actual).to.be.eql({  
            code: 200,
            message: '登入成功'
        });
        sinon.assert.calledWith(database.query, {});
        sinon.assert.calledOnce(poolStub.getConnection);
        //const account = "admin";
        //const password = "12345";
        sinon.assert.calledWith(connStub.a, "SELECT * FROM Member WHERE Account = ?");
        sinon.assert.calledOnce(connStub.release);
    });
});