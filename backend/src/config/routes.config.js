var UsersController = require('./../controllers/users/users.controller');
var UsersMiddleware = require('./../middlewares/users.middleware');
var TokenMiddleware = require('./../middlewares/token.middleware');

var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();

module.exports = function (server) {

    server.opts(/\/.*/g, function (req, res) {
        res.send(200);
    });

    server.get('/users', [TokenMiddleware, usersController.get]);
    server.get('/users/:id', usersController.getSpecific);
    server.put('/users/:id', [usersMiddleware.hasAllInformation, usersController.addOrUpdate]);
    server.del('/users/:id', usersController.remove);

};
