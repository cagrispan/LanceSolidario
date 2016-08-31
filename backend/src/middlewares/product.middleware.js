'use strict';
function ProductsMiddleware() {

    this.hasAllInformation = function (req, res, next) {

        if (req.body && req.params) {
            if (req.body.title && req.body.description && req.body.token) {
                return next();
            } else {
                var message = "parameters missing: ";
                if(!req.body.title) {
                    message += "title ";
                }
                if(!req.body.description) {
                    message += "description ";
                }
                if(!req.body.token) {
                    message += "token ";
                }
                return res.send(404, {message: message});
            }
        } else {
            return res.send(404, {message: "parameters missing. body"});
        }
    };
}
ProductsMiddleware.constructor = ProductsMiddleware;
module.exports = ProductsMiddleware;
