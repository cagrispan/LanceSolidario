/**
 * Created by Aliss on 11/08/2016.
 */
(function () {
    'use strict';

    describe('Auction resource', function () {
        var auctionResource;
        var httpBackend;
        var promise;
        var scope;

        beforeEach(module('lanceSolidario.auction.auctionResource'));
        beforeEach(inject(function (_auctionResource_, $httpBackend, $rootScope) {
            httpBackend = $httpBackend;
            auctionResource = _auctionResource_;
            scope = $rootScope;
        }));


        describe('create a auction object', function () {

            it('should get a object with id when sending a object with a title "ThisIsATitle"', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/auctions").respond(200, {
                    id: 'thisIsAValidId',
                    title:'ThisIsATitle'
                });
                promise = auctionResource.add({'title': 'ThisIsATitle'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.title).toBe('ThisIsATitle');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request whwn send a auction without a title', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/auctions").respond(404, {
                    "message": "parameters missing."
                });
                promise = auctionResource.add({'title': ''});
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
        describe('save a auction object', function () {

            it('should get an object with facebookId', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/auctions/validFacebookId/auth").respond(200, {
                    name: 'auctionTestName',
                    facebookId: 'validId'
                });
                promise = auctionResource.save({'facebookId': 'validFacebookId', 'token': 'validToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.name).toBe('auctionTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request, request without token/facebookId', inject(function () {
                httpBackend.expect("POST", globalConfig.backendBasePath + "/auctions/invalidId/auth").respond(404, {
                    "message": "parameters missing."
                });
                promise = auctionResource.save({'facebookId': 'invalidId'});
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