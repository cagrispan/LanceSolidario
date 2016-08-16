'use strict';
var User = require('../../models/facades/Users/UsersFacade');
var config = require('../../config/env.config');
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
        user.token = req.body.token;
        return user.createOrUpdate().then(function(result){
            if(result.dataValues.id) {
                return res.send(200);
            } else {
                return res.send(500);
            }
        }, function(err) {
            return res.send(500)
        });
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



