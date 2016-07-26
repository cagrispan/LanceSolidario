'use strict';

var Sequelize = require('sequelize');

function Users(sequelize) {
  var cadastroPF = sequelize.define('CadastroPF', {
    name: {type: Sequelize.STRING, primaryKey: true, allowNull: false}
  }).schema('lance');
  return user;
}

module.exports = Users;