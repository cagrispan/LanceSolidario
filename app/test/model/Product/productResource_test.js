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