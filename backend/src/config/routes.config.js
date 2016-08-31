var UsersController = require('./../controllers/users/users.controller');
var UsersMiddleware = require('./../middlewares/users.middleware');
var TokenMiddleware = require('./../middlewares/token.middleware');
var AuthController = require('./../controllers/auth/auth.controller');
var AuthMiddleware = require('./../middlewares/auth.middleware');
var ProductController = require('./../controllers/product/product.controller');
var ProductMiddleware = require('./../middlewares/product.middleware');

var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();
var authController = new AuthController();
var authMiddleware = new AuthMiddleware();
var productController = new ProductController();
var productMiddleware = new ProductMiddleware();

module.exports = function (server) {

    server.opts(/\/.*/g, function (req, res) {
        res.setHeader('Access-Control-Allow-Methods', 'PUT', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        res.setHeader('Access-Control-Allow-Origin', 'http://local.lancesolidario.com.br:8080');
        res.setHeader('Accept-Encoding', 'gzip, deflate, sdch');
        res.setHeader('Accept-Language', 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4');
        res.send(200);
    });

    server.put('/users/:id', [authMiddleware.isLogged, usersMiddleware.hasAllInformation, usersController.addOrUpdate]);

    server.post('/auth/:facebookId', authController.login);

    server.post('/products', [productMiddleware.hasAllInformation,  productController.create]);

};
