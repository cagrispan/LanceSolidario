'use strict';

var userEntity = require('../../entities/User');
var productUser = require('../../entities/ProductsUsers');
var productEntity = require('../../entities/Product');
var clone = require('clone');

productEntity.belongsToMany(userEntity, {through: productUser, as: 'donorUser'});
userEntity.belongsToMany(productEntity, {through: productUser, as: 'product'});

function ProductFacade() {
    this.title = null;
    this.description = null;
    this.category = null;
    this.tags = null;
    this.isUsed = null;
    this.images = null;
    this.auctions = null;
    this.buyerUser = null;
    this.donorUser = null;

    this.create = function () {
        var productFacade = this;
        var productToUpdate = null;

        return userEntity.findOne({where: {facebookId: productFacade.donorUser}})
            .then(function(resolution){
                productFacade.donorUser = resolution.dataValues.id;
                return productEntity.create(productFacade);
            })
            .then(function (resolution) {
                productToUpdate = resolution;
                return productToUpdate.addDonorUser(productFacade.donorUser);
            })
            .then(function () {
                return productToUpdate;
            })

    }
}

ProductFacade.constructor = ProductFacade;
module.exports = ProductFacade;