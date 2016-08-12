'use strict';
function UsersMiddleware() {

    this.hasAllInformation = function (req, res, next) {
        if (req.body) {
            if (req.body.name && req.body.birthday && req.body.email && req.body.address && req.body.telephone) {
                next();
            } else {
                res.send(404, {message: "parameters missing."})
            }
        } else {
            res.send(404, {message: "parameters missing."})
        }


    };
}
UsersMiddleware.constructor = UsersMiddleware;
module.exports = UsersMiddleware;
