'use strict';
var firebase = require("../config/firebase.config");
var reference = firebase.database().ref("admins");

function AdminsAuth() {

  this.authenticate = function (req, res) {
    reference.once("value").then(function (data) {
      var id = req.params.id;
      var user = data.val()[id];
      if (user) {
        res.json({
          type: true,
          data: user
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect username/password"
        });
      }
    });


  };
};
AdminsAuth.constructor = AdminsAuth;
module.exports = AdminsAuth;
