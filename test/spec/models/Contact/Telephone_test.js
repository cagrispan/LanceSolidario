(function () {
    'use strict';

    describe('Telephone entity', function () {
        var Telephone;
        var telephoneResource;
        var $q;
        var rootScope;

        beforeEach(module('lanceSolidario.telephone.telephone', 'lanceSolidario.telephone.telephoneResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_telephoneResource_, _Telephone_, _$q_, _$rootScope_) {
                Telephone = _Telephone_;
                telephoneResource = _telephoneResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
            });
        });

        describe('new', function () {
            it('should instantiate a Telephone object', inject(function () {
                var telephone = new Telephone();
                expect(telephone).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a telephone like parameter', function () {
                var telephone = new Telephone();
                telephone.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(telephoneResource, 'update').and.returnValue(fakePromise);
                var x = telephone._update();
                expect(telephoneResource.update).toHaveBeenCalledWith(telephone);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a telephone like parameter', function () {
                var telephone = new Telephone();
                telephone.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(telephoneResource, 'add').and.returnValue(fakePromise);
                var x = telephone._add();
                expect(telephoneResource.add).toHaveBeenCalledWith(telephone);
            })
        });


    });
})();
