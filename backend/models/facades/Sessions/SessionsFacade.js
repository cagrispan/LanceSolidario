'use strict';

var EntityItem = require('../../entities/Session');
var Sequelize = require('sequelize');
var Q = require('q');

var sequelize = new Sequelize(
  config.settings.pgConfig.database,
  config.settings.pgConfig.username,
  config.settings.pgConfig.password,
  config.settings.pgConfig.options);

var entityItem = new EntityItem(sequelize);

function EntityItemFacade() {
}

function create(item) {
  var now = new Date();
  item.UltimoLogin = now;
  var str = item.CPF + now.getTime();
  item.Token = crypto.createHash('sha256').update(str).digest('hex');
  return entityItem.create(item);
}

function revalidateByToken(token) {
  var data = {
    UltimoLogin: new Date()
  };
  return update(data, {Token: token});
}

function update(item, whereItem) {
  return entityItem.update(item, {where: whereItem})
    .then(function (data) {
      return data[0];
    });
}

function isValidByToken(token) {
  var deffered = Q.defer();

  var intervalInHours = 3;

  var now = new Date();
  var dt = new Date(now.getTime() - (intervalInHours * 60 * 60 * 1000));

  get({Token: token, UltimoLogin: {$gt: dt}}).then(function (data) {

    if (data.length === 0) {
      deffered.reject('invalid session');
    } else {
      deffered.resolve(true);
    }
  }, function (err) {
    deffered.reject(err);
  });

  return deffered.promise;
}

function get(whereItem) {
  return entityItem.findAll({where: whereItem}).then(mapDataValues);
}

function mapDataValues(resultSet) {
  return resultSet.map(function (item) {
    return item.dataValues;
  });
}

function getByToken(token) {
  return get({Token: token}).then(function (data) {
    return data[0];
  });
}

function removeByToken(token) {
  return entityItem.destroy({where: {Token: token}});
}

EntityItemFacade.prototype = {
  create: create,
  isValidByToken: isValidByToken,
  getByToken: getByToken,
  update: update,
  removeByToken: removeByToken,
  revalidateByToken: revalidateByToken
};

var entityItemFacade = new EntityItemFacade();
module.exports = entityItemFacade;