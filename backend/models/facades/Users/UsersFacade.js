'use strict';

var EntityItem = require('../../entities/User');
var Sequelize = require('sequelize');
var config = require('../dbConfig');

var sequelize = new Sequelize(
    "lance",
    "root",
    "admin",
    {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

var entityItem = new EntityItem(sequelize);

function EntityItemFacade() {
}

function createOrUpdate(item) {
    return entityItem.findOrCreate({where: {cpf: item.cpf}, defaults: item})
        .spread(function (user, created) {
            if (created) {
                return created;
            }
            return update(item, {cpf: item.cpf});
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