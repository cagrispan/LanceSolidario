/**
 * Created by Aliss on 11/08/2016.
 */
(function () {
    'use strict';

    describe('Product resource', function () {
        var productResource;
        var httpBackend;
        var promise;
        var scope;

        beforeEach(module('lanceSolidario.product.productResource'));
        beforeEach(inject(function (_productResource_, $httpBackend, $rootScope) {
            httpBackend = $httpBackend;
            productResource = _productResource_;
            scope = $rootScope;
        }));


        describe('create a product object', function () {

            it('should get a object with id when sending a object with a title "ThisIsATitle"', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/products").respond(200, {
                    id: 'thisIsAValidId',
                    title:'ThisIsATitle'
                });
                promise = productResource.add({'title': 'ThisIsATitle'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.title).toBe('ThisIsATitle');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request whwn send a product without a title', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/products").respond(404, {
                    "message": "parameters missing."
                });
                promise = productResource.add({'title': ''});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(true).toBe(false);
                }, function (resolve) {
                    expect(resolve.message).toBe('parameters missing.');
                });
                scope.$digest();
            }));
        });

        /*
        describe('save a product object', function () {

            it('should get an object with facebookId', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/products/validFacebookId/auth").respond(200, {
                    name: 'productTestName',
                    facebookId: 'validId'
                });
                promise = productResource.save({'facebookId': 'validFacebookId', 'token': 'validToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.name).toBe('productTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request, request without token/facebookId', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/products/invalidId/auth").respond(404, {
                    "message": "parameters missing."
                });
                promise = productResource.save({'facebookId': 'invalidId'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(true).toBe(false);
                }, function (resolve) {
                    expect(resolve.message).toBe('parameters missing.');
                });
                scope.$digest();
            }));
        });

        */
    });
})();