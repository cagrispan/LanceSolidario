'use strict';

var expect = require('chai').expect;
var UsersFacade = require('./../../../../src/models/facades/Users/UsersFacade');
var q = require('q');

describe('UsersFacade Tests', function () {


    it('should be a function', function (done) {
        var usersFacade = new UsersFacade();

        expect(typeof usersFacade.createOrUpdate).to.equal('function');
        done();
    });

    it('should create or update an user on database', function (done) {
        var usersFacade = new UsersFacade();

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

        usersFacade.createOrUpdate().then(function (result) {
            expect(result.dataValues.name).to.equal('testeZao');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('should update facebookToken if user already been created', function (done) {
        var usersFacade = new UsersFacade();

        usersFacade.facebookId = 'teste123456';
        usersFacade.email = 'teste@teste';
        usersFacade.birthday = new Date('10/09/1998');
        usersFacade.name = 'testeZao';
        usersFacade.facebookToken = 'tokenTestLogin';
        usersFacade.token = 'lalala';

        usersFacade.facebookLogin().then(function (result) {
            expect(result.dataValues.facebookToken).to.equal('tokenTestLogin');
            expect(result.dataValues.token).to.equal('hahaha');
            done();
        });

    });

    it('should verify that does not have an user and create it', function (done) {
        var usersFacade = new UsersFacade();

        usersFacade.facebookId = makeid();
        usersFacade.birthday = new Date('10/09/1998');
        usersFacade.name = 'testeZao';
        usersFacade.facebookToken = 'tokenTestLogin';

        usersFacade.facebookLogin().then(function (result) {
            expect(result.dataValues.facebookToken).to.equal('tokenTestLogin');
            done();
        });

        function makeid()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

    });
});