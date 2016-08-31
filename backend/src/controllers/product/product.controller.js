'use strict';
var Product = require('../../models/facades/Products/ProductsFacade');
var config = require('../../config/env.config.js');

function ProductController() {
    this.create = function (req, res) {
        var product = new Product();

        product.title = req.body.title;
        product.description = req.body.description;
        product.category = req.body.category;
        product.tags = req.body.tags;
        product.isUsed = req.body.isUsed;
        product.images = req.body.images;
        product.auctions = req.body.auctions;
        product.donorUser = req.body.donorUser;

        return product.create().then(function(resolution){
            if(resolution.dataValues.id) {
                return res.send(200, {id: resolution.dataValues.id});
            }
        }, function(){
            return res.send(500);
        });
    };
}

ProductController.constructor = ProductController;
module.exports = ProductController;



