'use strict';

var expect = require('chai').expect;
var UsersFacade = require('./UsersFacade');

describe('UsersFacade Tests', function () {

    var usersFacade = new UsersFacade();

    it('should create or update an user on database', function (done) {
        usersFacade.facebookId = 'teste123456';
        usersFacade.email = 'teste@teste';
        usersFacade.address = {
            number: "123",
            complement: "casa 1",
            street: "rua",
            city: "cidadezinha",
            neighborhood: "vilaPinto",
            state: "paranazao"
        };
        usersFacade.birthday = new Date('10/09/1998');
        usersFacade.name = 'testeZao';
        usersFacade.token = 'tokenTest';

        usersFacade.createOrUpdate().then(function(result) {
            expect(result.dataValues.name).to.equal('testeZao');
            done();
        }).catch(function(err) {
            console.log(err);
        });

    });
});