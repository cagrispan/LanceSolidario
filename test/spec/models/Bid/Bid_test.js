(function () {
    'use strict';

    describe('Bid entity', function () {
        var Bid;
        var bidResource;
        var $q;
        var rootScope;
        var Auction;

        beforeEach(module('lanceSolidario.bid.bid', 'lanceSolidario.bid.bidResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_bidResource_, _Bid_, _$q_, _$rootScope_) {
                Bid = _Bid_;
                bidResource = _bidResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
                Auction = function () {
                    this.auctionId = null;
                    this.facebookId = null;
                }

            });
        });

        describe('new', function () {
            it('should instantiate a Bid object', inject(function () {
                var bid = new Bid();
                expect(bid).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a bid like parameter', function () {
                var bid = new Bid();
                bid.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(bidResource, 'update').and.returnValue(fakePromise);
                var x = bid._update();
                expect(bidResource.update).toHaveBeenCalledWith(bid);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a bid like parameter', function () {
                var bid = new Bid();
                bid.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(bidResource, 'add').and.returnValue(fakePromise);
                var x = bid._add();
                expect(bidResource.add).toHaveBeenCalledWith(bid);
            })
        });

        describe('loadListByUser', function () {

            it('should call load method of resource with a user like parameter and populate auction/institution object', function () {
                var user = {};
                var bid = new Bid();
                user.facebookId = 'validFacebookId';
                var fakePromise = $q.when({
                    'facebookId': 'validFacebookId',
                    'bids': [{
                        'bidId': 'validBidId',
                        'institutionId': 'validInstitutionId1',
                        'auctionId': 'validAuctionId1'
                    }, {
                        'bidId': 'validBidId2',
                        'institutionId': 'validInstitutionId2',
                        'auctionId': 'validAuctionId2'
                    }]
                });
                spyOn(bidResource, 'loadBidsByUser').and.returnValue(fakePromise);
                var result = bid._listByUser({'facebookId':'validFacebookId'});

                expect(bidResource.loadBidsByUser).toHaveBeenCalledWith({'facebookId':'validFacebookId'});
                result.then(function (result) {
                    expect(result[0].auction.auctionId).toBe('validAuctionId1');
                    //expect(result[0].institution.institutionId).toBe('validInstitutionId1');
                    expect(result[1].auction.auctionId).toBe('validAuctionId2');
                    //expect(result[1].institution.institutionId).toBe('validInstitutionId2');
                });
                rootScope.$digest();
            })
        });

        describe('loadListByAuction', function () {

            it('should call load method of resource with a auction like parameter and populate auction/institution object', function () {
                var auction = {};
                var bid = new Bid();
                auction.auctionId = 'validAuctionId';
                var fakePromise = $q.when({
                    'auctionId': 'validAuctionId',
                    'bids': [{
                        'bidId': 'validBidId',
                        'institutionId': 'validInstitutionId1',
                        'auctionId': 'validAuctionId1'
                    }, {
                        'bidId': 'validBidId2',
                        'institutionId': 'validInstitutionId2',
                        'auctionId': 'validAuctionId2'
                    }]
                });
                spyOn(bidResource, 'loadBidsByAuction').and.returnValue(fakePromise);
                var result = bid._listByAuction({'auctionId':'validAuctionId'});

                expect(bidResource.loadBidsByAuction).toHaveBeenCalledWith({'auctionId':'validAuctionId'});
                result.then(function (result) {
                    expect(result[0].auction.auctionId).toBe('validAuctionId1');
                    //expect(result[0].institution.institutionId).toBe('validInstitutionId1');
                    expect(result[1].auction.auctionId).toBe('validAuctionId2');
                    //expect(result[1].institution.institutionId).toBe('validInstitutionId2');
                });
                rootScope.$digest();
            })
        });


    });
})();
