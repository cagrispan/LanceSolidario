'use strict';
var expect = require('chai').expect;
var proxyquire = require("proxyquire");
var UserMock = require('./../../models/facades/Users/Users.mock');
var AuthController = proxyquire('../../../src/controllers/auth/auth.controller.js',
    {'../../models/facades/Users/UsersFacade': UserMock});
var sinon = require('sinon');
var q = require('q');

describe('Users controller Tests', function () {

    var authController = new AuthController();

    it('should be a function', function(done) {
        expect(typeof authController.login).to.equal('function');
        done();
    });

    it('should create or update an user on database', function (done) {
        var req = {
            params: {
                facebookId: 'teste123456'
            },
            body: {
                birthday: new Date('10/09/1998'),
                name: 'testeZao',
                facebookToken: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};

        authController.login(req, res).then(function () {
            expect(res.send.calledWith(200)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });
});

