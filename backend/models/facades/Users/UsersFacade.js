'use strict';

var EntityItem = require('../../entities/User');
var Sequelize = require('sequelize');
var config = require('../dbConfig');

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options);

var entityItem = new EntityItem(sequelize);

function EntityItemFacade() {
}

function createOrUpdate(item) {
  return entityItem.findOrCreate({where: {CPFConsumidor: item.CPFConsumidor}, defaults: item})
    .spread(function (user, created) {
      if (created) {
        return created;
      }
      return update(item, {CPFConsumidor: item.CPFConsumidor});
    });
}

function create(item) {
  return entityItem.create(item);
}

function update(item, whereItem) {
  return entityItem.update(item, {where: whereItem});
}

function get(whereItem) {
  return entityItem.findAll({where: whereItem}).then(mapDataValues);
}

function mapDataValues(resultSet) {
  return resultSet.map(function (item) {
    return item.dataValues;
  });
}

function getByCpf(ItemCpf) {
  return get({CPFConsumidor: ItemCpf});
}

EntityItemFacade.prototype = {
  create: create,
  update: update,
  get: get,
  getByCpf: getByCpf,
  createOrUpdate: createOrUpdate
};

var entityItemFacade = new EntityItemFacade();
module.exports = entityItemFacade;