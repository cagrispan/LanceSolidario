'use strict';
function UsersMiddleware() {

    this.hasAllInformation = function (req, res, next) {
        console.log(req);

        if (req.body && req.params) {
            if (req.body.name && req.body.birthday && req.body.email && req.body.address && req.body.telephone && req.params.id) {
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
