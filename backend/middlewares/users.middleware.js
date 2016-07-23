'use strict';
function UsersMiddleware() {

  this.hasAllInformation = function(req, res, next) {
    if(req.body){
      if(req.body.card && req.body.name && req.body.role) {
        next();
      } else {
        console.log(req.body.card + req.body.name + req.body.role);
        res.send(404, {message: "parameters missing."})
      }
    } else {
      console.log(req.body.card + req.body.name + req.body.role);
      res.send(404, {message: "parameters missing."})
    }


  };
}
UsersMiddleware.constructor = UsersMiddleware;
module.exports = UsersMiddleware;
