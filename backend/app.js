'use strict';

var restify = require('restify'),
    server = restify.createServer();
server.use(restify.bodyParser({overrideParams: true}));
server.use(restify.queryParser());
server.use(restify.CORS());

var config = require('./src/config/env.config.js');
require('./src/config/routes.config.js')(server);


try{
  server.listen(config.rest.port, '::', function () {
    console.log('%s listening at %s', server.name, server.url);
  });
}catch(e){
  console.log(e);
}


