'use strict';
var User  = require('../../models/entities/User');
function UsersController() {
    this.get = function (req, res) {
    };

    this.add = function (req, res) {
        var user = new User();
        user.cpf = '12345';
        user.add();
    };

    this.update = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.update('12345');
    };

    this.getSpecific = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.get().then(function(data) {
            console.log(data.dataValues);
        });
    };

    this.remove = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.destroy().then(function(data) {
            console.log('deu');
        });
    };
}

UsersController.constructor = UsersController;
module.exports = UsersController;
