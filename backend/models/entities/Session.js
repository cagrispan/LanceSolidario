'use strict';

var Sequelize = require('sequelize');

var Sessao = function (sequelize) {
  var sessao = sequelize.define('Sessoes', {
    CPF: {type: Sequelize.STRING, allowNull: false},
    Token: {type: Sequelize.STRING, primaryKey: true, allowNull: false},
    Password: {type: Sequelize.STRING, allowNull: false},
    UltimoLogin: {type: Sequelize.DATE, allowNull: false},
    Nascimento: {type: Sequelize.DATE}
  }).schema('integracao');
  return sessao;
};

module.exports = Sessao;