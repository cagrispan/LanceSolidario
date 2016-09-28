(function () {
    'use strict';

    xdescribe('Address entity', function () {
        var Address;
        var addressResource;
        var $q;
        var rootScope;

        beforeEach(module('lanceSolidario.address.address', 'lanceSolidario.address.addressResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_addressResource_, _Address_, _$q_, _$rootScope_) {
                Address = _Address_;
                addressResource = _addressResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
            });
        });

        describe('new', function () {
            it('should instantiate a Address object', inject(function () {
                var address = new Address();
                expect(address).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a address like parameter', function () {
                var address = new Address();
                address.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(addressResource, 'update').and.returnValue(fakePromise);
                var x = address._update();
                expect(addressResource.update).toHaveBeenCalledWith(address);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a address like parameter', function () {
                var address = new Address();
                address.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(addressResource, 'add').and.returnValue(fakePromise);
                var x = address._add();
                expect(addressResource.add).toHaveBeenCalledWith(address);
            })
        });


    });
})();
