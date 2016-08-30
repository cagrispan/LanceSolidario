'use strict';
var User  = require('../../models/facades/Users/UsersFacade');

function AuthController() {
    this.get = function (req, res) {

    };

    this.login = function(req, res) {
        var user = new User();
        user.facebookId = req.params.facebookId;
        user.birthday = new Date(req.body.birthday);
        user.name = req.body.name;
        user.facebookToken = req.body.facebookToken;

        return user.facebookLogin().then(function(resolution) {
            return res.send(200, {token: resolution.dataValues.token});
        });
    };
}

AuthController.constructor = AuthController;
module.exports = AuthController;
