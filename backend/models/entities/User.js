'use strict';

var Sequelize = require('sequelize');
var config = require('../../config/env.config');
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect
    }
);


var User = sequelize.define('user', {
    cpf: {
        type: Sequelize.STRING
    }
});

function UserEntity() {
    this.cpf = null;

    this.add = function () {
        var user = this;
        User.sync({force: true}).then(function () {
            // Table created
            return User.create({
                cpf: user.cpf
            });
        });
    };

    this.update = function (oldCpf) {
        var user = this;
        return User.update({
            cpf: user.cpf
        }, {where: {cpf: oldCpf}});
    };

    this.get = function () {
        var user = this;
        return User.findOne({
            where: {cpf: user.cpf},
            attributes: ['id', 'cpf']
        }).then(function (data) {
            return data;
        })
    };

    this.destroy = function () {
        var user = this;
        return User.destroy({where: {cpf: user.cpf}});
    };
}

module.exports = UserEntity;