'use strict';
var User = require ('../models/entities/User');
var jwt = require('jsonwebtoken');
var config = require('../config/env.config');

function UsersAuth() {

    this.authenticate = function (req, res) {
        var user = new User();

        user.cpf = req.body.cpf;
        user.get()
            .then(function(resolution) {
                if(resolution.dataValues.id) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: '2m' // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.send(200,{
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            });
    };
};
UsersAuth.constructor = UsersAuth;
module.exports = UsersAuth;
