var UsersController = require('../controllers/users/users-controller.js');
var UsersMiddleware = require('../middlewares/users.middleware.js');

var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();

module.exports = function (server) {
  server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  server.get('/users', usersController.get);
  server.get('/users/:id', usersController.getSpecific);
  server.post('/users', [usersMiddleware.hasAllInformation, usersController.add]);
  server.put('/users/:id', [usersMiddleware.hasAllInformation, usersController.update]);
  server.del('/users/:id', usersController.remove);

};
