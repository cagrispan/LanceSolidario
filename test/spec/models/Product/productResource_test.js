//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

(function () {
    'use strict';

    describe('Product resource', function () {
        var productResource;
        var httpBackend;
        var promise;
        var scope;
        var apiToken;

        beforeEach(module('lanceSolidario.product.productResource', 'utils'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('apiToken', {
                    getApiToken: function () {
                        return 'validAccessToken'
                    }
                })
            });

            inject(function (_productResource_, $httpBackend, $rootScope) {
                httpBackend = $httpBackend;
                productResource = _productResource_;
                scope = $rootScope;
            })
        });


        describe('update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId/products/' + 'validProductId',{
                    'facebookId': 'validFacebookId',
                    'productId': 'validProductId',
                    'product': 'product'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = productResource.update({
                    'facebookId': 'validFacebookId',
                    'productId': 'validProductId',
                    'product': 'product'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidFacebookId/products/' + 'invalidProductId',{
                    'facebookId': 'invalidFacebookId',
                    'productId': 'invalidProductId',
                    'product': 'product'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = productResource.update({
                    'facebookId': 'invalidFacebookId',
                    'productId': 'invalidProductId',
                    'product': 'product'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.update({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.update({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('add', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/validFacebookId/products',{
                    'facebookId': 'validFacebookId',
                    'product': 'product'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = productResource.add({
                    'facebookId': 'validFacebookId',
                    'product': 'product'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/invalidFacebookId/products',{
                    'facebookId': 'invalidFacebookId',
                    'product': 'product'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.add({
                    'facebookId': 'invalidFacebookId',
                    'product': 'product'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.add({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

        describe('listByAuction', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/auctions/validAuctionId/products').respond(200, {
                    'auctionId': 'validAuctionId',
                    'product': [{'productId':'validProductId'}]
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.loadProductsByAuction({
                    'auctionId': 'validAuctionId',
                    'facebookId': 'facebookId'
                });
                httpBackend.flush();
                promise.then(function (resolve) {
                    expect(resolve.auctionId).toBe('validAuctionId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/auctions/invalidAuctionId/products').respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.loadProductsByAuction({
                    'auctionId': 'invalidAuctionId',
                    'facebookId': 'facebookId'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.loadProductsByAuction({});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

        describe('loadProducts', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'validFacebookId/' + 'products'
                ).respond(200, {products: [{product: '12345678'}, {product: '87655598'}]});

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = productResource.loadProductsByUser({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve[0].product).toBe('12345678');
                    expect(resolve[1].product).toBe('87655598');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId/' + 'products').respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = productResource.loadProductsByUser({
                    'facebookId': 'invalidFacebookId',
                    'token': 'invalidAccessToken'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.loadProductsByUser({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = productResource.loadProductsByUser({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

    });
})();
