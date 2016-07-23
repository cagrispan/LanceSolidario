'use strict';
function DoorsMiddleware() {

  this.hasAllInformation = function (req, res, next) {
    if (req.body) {
      if (req.body.location && req.body.identification) {
        next();
      } else {
        res.send(404, {message: "parameters missing."})
      }
    } else {
      res.send(404, {message: "parameters missing."})
    }

  };
}
DoorsMiddleware.constructor = DoorsMiddleware;
module.exports = DoorsMiddleware;
