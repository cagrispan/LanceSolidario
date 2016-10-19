(function () {
    'use strict';

    describe('Auction entity', function () {
        var Auction;
        var auctionResource;
        var $q;
        var rootScope;
        var Product;

        beforeEach(module('lanceSolidario.auction.auction', 'lanceSolidario.auction.auctionResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_auctionResource_, _Auction_, _$q_, _$rootScope_) {
                Auction = _Auction_;
                auctionResource = _auctionResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
                Product = function () {
                    this.productId = null;
                    this.facebookId = null;
                }

            });
        });

        describe('new', function () {
            it('should instantiate a Auction object', inject(function () {
                var auction = new Auction();
                expect(auction).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a auction like parameter', function () {
                var auction = new Auction();
                auction.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(auctionResource, 'update').and.returnValue(fakePromise);
                var x = auction._update();
                expect(auctionResource.update).toHaveBeenCalledWith(auction);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a auction like parameter', function () {
                var auction = new Auction();
                auction.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(auctionResource, 'add').and.returnValue(fakePromise);
                var x = auction._add();
                expect(auctionResource.add).toHaveBeenCalledWith(auction);
            })
        });

        describe('loadList', function () {

            it('should call load method of resource with a user like parameter and populate product/institution object', function () {
                var user = {};
                var auction = new Auction();
                user.facebookId = 'validFacebookId';
                var fakePromise = $q.when({
                    'facebookId': 'validFacebookId',
                    'auctions': [{
                        'auctionId': 'validAuctionId',
                        'institutionId': 'validInstitutionId1',
                        'productId': 'validProductId1'
                    }, {
                        'auctionId': 'validAuctionId2',
                        'institutionId': 'validInstitutionId2',
                        'productId': 'validProductId2'
                    }]
                });
                spyOn(auctionResource, 'loadAuctions').and.returnValue(fakePromise);
                var result = auction._listByUser({'facebookId': 'validFacebookId'});

                expect(auctionResource.loadAuctions).toHaveBeenCalledWith({'facebookId': 'validFacebookId'});
                result.then(function (result) {
                    expect(result[0].productId).toBe('validProductId1');
                    //expect(result[0].institution.institutionId).toBe('validInstitutionId1');
                    expect(result[1].productId).toBe('validProductId2');
                    //expect(result[1].institution.institutionId).toBe('validInstitutionId2');
                });
                rootScope.$digest();
            })
        });

        describe('loadList', function () {

            it('should call listAll method of resource and populate product/institution object', function () {
                var user = {};
                var auction = new Auction();
                user.facebookId = 'validFacebookId';
                var fakePromise = $q.when({
                    'auctions': [{
                        'auctionId': 'validAuctionId',
                        'institutionId': 'validInstitutionId1',
                        'productId': 'validProductId1'
                    }, {
                        'auctionId': 'validAuctionId2',
                        'institutionId': 'validInstitutionId2',
                        'productId': 'validProductId2'
                    }]
                });
                spyOn(auctionResource, 'loadAll').and.returnValue(fakePromise);
                var result = auction._listAll({'facebookId': 'validFacebookId'});

                expect(auctionResource.loadAll).toHaveBeenCalledWith({'facebookId': 'validFacebookId'});
                result.then(function (result) {
                    expect(result[0].productId).toBe('validProductId1');
                    //expect(result[0].institution.institutionId).toBe('validInstitutionId1');
                    expect(result[1].productId).toBe('validProductId2');
                    //expect(result[1].institution.institutionId).toBe('validInstitutionId2');
                });
                rootScope.$digest();
            })
        });



        describe('load', function () {

            it('should call load method of resource with a auction like parameter and populate product/institution object', function () {
                var auction = new Auction();
                auction.auctionId = 'auctionId';
                auction.productId = 'productId';
                var fakePromise = $q.when(auction);
                spyOn(auctionResource, 'load').and.returnValue(fakePromise);
                var result = auction._load();

                expect(auctionResource.load).toHaveBeenCalled();
            })
        });


    });
})();
