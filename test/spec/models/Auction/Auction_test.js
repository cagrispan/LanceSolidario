(function () {
    'use strict';

    describe('Auction entity', function () {
        var Auction;
        var auctionResource;
        var $q;

        beforeEach(module('lanceSolidario.auction.auction', 'lanceSolidario.auction.auctionResourceMock'));
        beforeEach(inject(function (_auctionResource_, _Auction_, _$q_) {
            Auction = _Auction_;
            auctionResource = _auctionResource_;
            $q = _$q_;
        }));

        describe('new', function () {
            it('should instantiate a auction object', inject(function () {
                var auction = new Auction();
                expect(auction).toBeDefined();
            }));
        });

        describe('add', function () {
            it('should call add method of resource with a auction like parameter', function () {
                var auction = new Auction();

                auction.title = 'ThisIsATitle';

                var fakePromise = $q.when();
                spyOn(auctionResource, 'add').and.returnValue(fakePromise);

                var x = auction._add();
                expect(auctionResource.add).toHaveBeenCalledWith(auction);
            });
        });

        /*
        describe('add', function () {
            it('should call add method of resource with a auction like parameter', function () {
                var auction = new Auction();
                auction.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(auctionResource, 'add').and.returnValue(fakePromise);

                var x = auction._add();
                expect(auctionResource.add).toHaveBeenCalledWith(auction);
            });
        });
        */
    });
})();