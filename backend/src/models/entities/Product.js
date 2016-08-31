'use strict';

var Sequelize = require('sequelize');
var config = require('../../config/env.config.js');
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect
    }
);

module.exports = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    buyerUser:{
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    tags: {
        type: Sequelize.STRING
    },
    isUsed: {
        type: Sequelize.BOOLEAN
    },
    images: {
        type: Sequelize.STRING
    },
    auctions: {
        type: Sequelize.STRING
    }
});

