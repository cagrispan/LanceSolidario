'use strict';
var jwt = require('jsonwebtoken');

function AuthMiddleware() {

    this.isLogged = function (req, res, next) {
        if(req.body.token) {
            var decoded = jwt.verify(req.body.token, 'banana');
             if (decoded.id == req.body.facebookId) {
                 return next();
             } else {
                 return res.send(401);
             }
        } else {
            return res.send(401);
        }

    };
}
AuthMiddleware.constructor = AuthMiddleware;
module.exports = AuthMiddleware;
