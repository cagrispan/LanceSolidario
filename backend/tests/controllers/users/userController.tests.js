'use strict';

var expect = require('chai').expect;
var proxyquire = require("proxyquire");
var UserMock = require('./../../models/facades/Users/Users.mock');
var JwtMock = require('./../jwt.mock.js');
var UsersController = proxyquire('../../../src/controllers/users/users.controller.js',
    {'../../models/facades/Users/UsersFacade': UserMock,
    'jsonwebtoken': JwtMock});
var sinon = require('sinon');
var q = require('q');

describe('Users controller Tests', function () {

    var usersController = new UsersController();

    it('should be a function', function(done) {
        expect(typeof usersController.addOrUpdate).to.equal('function');
        done();
    });

    it('should create or update an user on database', function (done) {
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
                facebookToken: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};

        usersController.addOrUpdate(req, res).then(function () {
            expect(res.send.calledWith(200)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('should return 500 when to try insert or update an user', function (done) {
        var req = {
            params: {
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
                token: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};

        usersController.addOrUpdate(req, res).then(null, function() {
            expect(res.send.calledWith(500)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });
});

