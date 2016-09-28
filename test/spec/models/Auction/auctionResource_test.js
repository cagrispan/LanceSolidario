//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

(function () {
    'use strict';

    describe('Auction resource', function () {
        var auctionResource;
        var httpBackend;
        var promise;
        var scope;
        var apiToken;

        beforeEach(module('lanceSolidario.auction.auctionResource', 'utils'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('apiToken', {
                    getApiToken: function () {
                        return 'validAccessToken'
                    }
                })
            });

            inject(function (_auctionResource_, $httpBackend, $rootScope) {
                httpBackend = $httpBackend;
                auctionResource = _auctionResource_;
                scope = $rootScope;
            })
        });


        describe('update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId/auctions/' + 'validAuctionId',{
                    'facebookId': 'validFacebookId',
                    'auctionId': 'validAuctionId',
                    'auction': 'auction'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = auctionResource.update({
                    'facebookId': 'validFacebookId',
                    'auctionId': 'validAuctionId',
                    'auction': 'auction'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidFacebookId/auctions/' + 'invalidAuctionId',{
                    'facebookId': 'invalidFacebookId',
                    'auctionId': 'invalidAuctionId',
                    'auction': 'auction'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = auctionResource.update({
                    'facebookId': 'invalidFacebookId',
                    'auctionId': 'invalidAuctionId',
                    'auction': 'auction'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.update({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.update({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('add', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/validFacebookId/auctions',{
                    'facebookId': 'validFacebookId',
                    'auction': 'auction'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = auctionResource.add({
                    'facebookId': 'validFacebookId',
                    'auction': 'auction'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/invalidFacebookId/auctions',{
                    'facebookId': 'invalidFacebookId',
                    'auction': 'auction'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.add({
                    'facebookId': 'invalidFacebookId',
                    'auction': 'auction'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.add({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });


        describe('list', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/validFacebookId/auctions').respond(200, {
                    'facebookId': 'validFacebookId',
                    'auction': [{'auctionId':'validAuctionId'}]
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.loadAuctions({
                    'facebookId': 'validFacebookId',
                    'auction': 'auction'
                });
                httpBackend.flush();
                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('validFacebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/invalidFacebookId/auctions').respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.loadAuctions({
                    'facebookId': 'invalidFacebookId',
                    'auction': 'auction'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = auctionResource.loadAuctions({});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

    });
})();
