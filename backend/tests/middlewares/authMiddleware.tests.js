'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require("proxyquire");

var JwtMock = require('./../controllers/jwt.mock.js');
var AuthMiddleware = proxyquire('../../src/middlewares/auth.middleware.js',
    {'jsonwebtoken': JwtMock});

describe('Auth middleware Tests', function () {

    var authMiddleware = new AuthMiddleware();

    it('should be a function', function (done) {
        expect(typeof authMiddleware.isLogged).to.equal('function');
        done();
    });

    it('should call next()', function (done) {
        var req = {
            params: {
                id: 'teste123456'
            },
            body: {
                email: 'teste@teste',
                address: {
                    number: "123",
                    complement: "casa 1",
                    street: "rua",
                    city: "cidadezinha",
                    neighborhood: "vila torres",
                    state: "paranazao"
                },
                telephone: '99999999',
                birthday: new Date('10/09/1998'),
                name: 'testeZao',
                facebookToken: 'facebookTokenTest',
                token: 'tokenTest',
                facebookId: 'teste123456'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        authMiddleware.isLogged(req, res, next);
        expect(next.calledOnce).to.equal(true);
        done();

    });

    it('should return 401', function (done) {
        var req = {
            params: {
                id: 'testefail'
            },
            body: {
                email: 'teste@teste',
                address: {
                    number: "123",
                    complement: "casa 1",
                    street: "rua",
                    city: "cidadezinha",
                    neighborhood: "vila torres",
                    state: "paranazao"
                },
                telephone: '99999999',
                birthday: new Date('10/09/1998'),
                name: 'testeZao',
                facebookToken: 'facebookTokenTest',
                token: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        authMiddleware.isLogged(req, res, next);
        expect(res.send.calledWith(401)).to.equal(true);
        done();

    });
});

