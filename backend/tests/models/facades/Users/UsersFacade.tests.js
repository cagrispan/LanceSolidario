'use strict';

var expect = require('chai').expect;
var UsersFacade = require('./../../../../src/models/facades/Users/UsersFacade');

describe('UsersFacade Tests', function () {

    var usersFacade = new UsersFacade();

    it('should be a function', function(done) {
        expect(typeof usersFacade.createOrUpdate).to.equal('function');
        done();
    });

    it('should create or update an user on database', function (done) {
        usersFacade.facebookId = 'teste123456';
        usersFacade.email = 'teste@teste';
        usersFacade.address = {
            number: "123",
            complement: "casa 1",
            street: "rua",
            city: "cidadezinha",
            neighborhood: "vila",
            state: "paranazao"
        };
        usersFacade.birthday = new Date('10/09/1998');
        usersFacade.name = 'testeZao';
        usersFacade.facebookToken = 'tokenTest';
        usersFacade.token = 'hahaha';

        usersFacade.createOrUpdate().then(function(result) {
            expect(result.dataValues.name).to.equal('testeZao');
            done();
        }).catch(function(err) {
            console.log(err);
        });

    });
});