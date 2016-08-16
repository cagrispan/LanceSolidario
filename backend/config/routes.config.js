var UsersController = require('../controllers/users/users-controller.js');
var UsersMiddleware = require('../middlewares/users.middleware.js');
var UsersAuth = require('../auth/users.auth.js');
var TokenMiddleware = require('../middlewares/token.middleware');
var PaymentsController = require('../controllers/payments/payments-controller');

var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();
var usersAuth = new UsersAuth();
var paymentsController = new PaymentsController();

module.exports = function (server) {

    server.get('/users', [TokenMiddleware,usersController.get]);
    server.get('/users/:id', usersController.getSpecific);
    server.put('/users/:id', [usersMiddleware.hasAllInformation, usersController.addOrUpdate]);
    server.del('/users/:id', usersController.remove);

    server.post('/authenticate', usersAuth.authenticate);

    server.post('/payments', paymentsController.add);

};
