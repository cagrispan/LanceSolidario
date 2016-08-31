'use strict';

var expect = require('chai').expect;
var proxyquire = require("proxyquire");
var ProductMock = require('./../../models/facades/Products/Products.mock');
var JwtMock = require('./../jwt.mock.js');
var ProductsController = proxyquire('../../../src/controllers/product/product.controller.js',
    {'../../models/facades/Products/ProductsFacade': ProductMock});
var sinon = require('sinon');
var q = require('q');

describe('Products controller Tests', function () {

    var productsController = new ProductsController();

    it('should be a function', function(done) {
        expect(typeof productsController.create).to.equal('function');
        done();
    });

    it('should return 200 ok', function (done) {
        var req = {
            params: {},
            body: {
                title: 'titletest',
                description: 'descriptionTest',
                category: 'categoryTest',
                tags: 'tagstest',
                isUsed: false,
                images: '',
                auctions: '',
                donorUser: 24
            }
        };

        var res = {send: sinon.spy()};

        productsController.create(req, res).then(function () {
            expect(res.send.calledWith(200)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });

    it('should return 500 when to try insert or update an product', function (done) {
        var req = {
            params: {},
            body: {
                title: null,
                description: 'descriptionTest',
                category: 'categoryTest',
                tags: 'tagstest',
                isUsed: false,
                images: '',
                auctions: '',
                donorUser: 24
            }
        };

        var res = {send: sinon.spy()};

        productsController.create(req, res).then(function(){
            expect(res.send.calledWith(500)).to.equal(true);
            done();
        }).catch(function (err) {
            console.log(err);
        });

    });
});

