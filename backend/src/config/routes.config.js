var UsersController = require('./users/users.controller.js');
var UsersMiddleware = require('./users.middleware.js');
var UsersAuth = require('../auth/users.auth.js');
var TokenMiddleware = require('./token.middleware');
var PaymentsController = require('./payments/payments-controller');

var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();
var usersAuth = new UsersAuth();
var paymentsController = new PaymentsController();

module.exports = function (server) {

    server.opts(/\/.*/g, function (req, res) {
        res.send(200);
    });

    server.get('/users', [TokenMiddleware, usersController.get]);
    server.get('/users/:id', usersController.getSpecific);
    server.put('/users/:id', [usersMiddleware.hasAllInformation, usersController.addOrUpdate]);
    server.del('/users/:id', usersController.remove);

    server.post('/authenticate', usersAuth.authenticate);

    server.post('/payments', paymentsController.add);

};
