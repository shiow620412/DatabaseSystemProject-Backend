
//import { IM_A_TEAPOT } from 'http-status';
import expect from 'chai';
import pkg from 'body-parser';
import supertest from 'supertest';
import '../../server/route/user.route.js';


const { json } = pkg;
const api = supertest('http://localhost:3000/api/user'); // 定義測試的 API 路徑
let APItoken; // 全域變數等待 before() 取得 Token

before((done) => {
  api.post('/user/login') // 登入測試
    .set('Accept', 'application/json')
    .send({
      account:'admin',
      password: '12345'
    })
    .expect(200)
    done();
    //.end((err, res) => {
    //  APItoken = res.token; // 登入成功取得 JWT
    //  done();
    //});
});

describe('findPassword test',() =>{
    it('should find',(done) =>{
        api.get('/findPassword')
        .expect(200)
        .end((err, res) =>{
            if(err){
                done(err);
            }
            return done();
        });
    });
});