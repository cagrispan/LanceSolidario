'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var ProductMiddleware = require('../../src/middlewares/product.middleware');

describe('Product middleware Tests', function () {

    var productMiddleware = new ProductMiddleware();

    it('should be a function', function(done) {
        expect(typeof productMiddleware.hasAllInformation).to.equal('function');
        done();
    });

    it('should call next()', function (done) {
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
                donorUser: 24,
                token: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        productMiddleware.hasAllInformation(req, res, next);
        expect(next.calledOnce).to.equal(true);
        done();

    });

    it('should return 404 missing information title', function (done) {
        var req = {
            params: {},
            body: {
                title: '',
                description: 'descriptionTest',
                category: 'categoryTest',
                tags: 'tagstest',
                isUsed: false,
                images: '',
                auctions: '',
                donorUser: 24,
                token: 'tokenTest'
            }
        };

        var res = {send: sinon.spy()};
        var next = sinon.spy();

        productMiddleware.hasAllInformation(req, res, next);
        expect(res.send.calledWith(404, {message: "parameters missing: title "})).to.equal(true);
        done();

    });
});

