'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var UsersMiddleware = require('../../src/middlewares/users.middleware');

describe('Users middleware Tests', function () {

    var usersMiddleware = new UsersMiddleware();

    it('should be a function', function(done) {
        expect(typeof usersMiddleware.hasAllInformation).to.equal('function');
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
                facebookToken: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        usersMiddleware.hasAllInformation(req, res, next);
            expect(next.calledOnce).to.equal(true);
            done();

    });

    it('should return 404 missing information', function (done) {
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
                facebookToken: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        usersMiddleware.hasAllInformation(req, res, next);
            expect(res.send.calledWith(404, {message: "parameters missing."})).to.equal(true);
            done();

    });
});

