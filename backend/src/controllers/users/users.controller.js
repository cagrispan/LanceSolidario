'use strict';
var User = require('../../models/facades/Users/UsersFacade');
var config = require('../../config/env.config.js');
var jwt = require('jsonwebtoken');
var q = require('q');

function UsersController() {
    this.get = function (req, res) {
    };

    this.addOrUpdate = function (req, res) {
        var user = new User();
        user.facebookId = req.params.id;
        user.email = req.body.email;
        user.telephone = req.body.telephone;
        user.address = req.body.address;
        user.birthday = new Date(req.body.birthday);
        user.name = req.body.name;
        user.facebookToken = req.body.facebookToken;

        var deferred = q.defer();

        jwt.sign({id: user.facebookId}, 'banana', {algorithm: 'HS256'}, function (err, token) {
            if (err) {
                return res.send(500, {message: "JWT Integration Error"});
            } else {
                user.token = token;
                return user.createOrUpdate().then(function (result) {
                    if (result.dataValues.id) {
                        deferred.resolve();
                        return res.send(200);
                    } else {
                        deferred.reject();
                        return res.send(500);
                    }
                }, function (err) {
                    deferred.reject();
                    return res.send(500)
                });
            }
        });

        return deferred.promise;

    };

    this.getSpecific = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.get().then(function (data) {
            console.log(data.dataValues);
        });
    };

    this.remove = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.destroy().then(function (data) {
            console.log('deu');
        });
    };
}

UsersController.constructor = UsersController;
module.exports = UsersController;



