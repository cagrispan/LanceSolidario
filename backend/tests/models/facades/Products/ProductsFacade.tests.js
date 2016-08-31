'use strict';

var expect = require('chai').expect;
var ProductsFacade = require('./../../../../src/models/facades/Products/ProductsFacade');
var q = require('q');

describe('ProductsFacade Tests', function () {


    it('should be a function', function (done) {
        var productsFacade = new ProductsFacade();

        expect(typeof productsFacade.create).to.equal('function');
        done();
    });

    it('should create or update an user on database', function (done) {
        var productsFacade = new ProductsFacade();

        productsFacade.title = 'titletest';
        productsFacade.description = 'descriptionTest';
        productsFacade.category = 'categoryTest';
        productsFacade.tags = 'tagstest';
        productsFacade.isUsed = false;
        productsFacade.images = '';
        productsFacade.auctions = '';
        productsFacade.donorUser = 24;

        productsFacade.create().then(function (resolution) {
            expect(resolution.dataValues.title).to.equal('titletest');
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

});