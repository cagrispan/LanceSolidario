(function () {
    'use strict';

    describe('Email entity', function () {
        var Email;
        var emailResource;
        var $q;
        var rootScope;

        beforeEach(module('lanceSolidario.email.email', 'lanceSolidario.email.emailResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_emailResource_, _Email_, _$q_, _$rootScope_) {
                Email = _Email_;
                emailResource = _emailResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
            });
        });

        describe('new', function () {
            it('should instantiate a Email object', inject(function () {
                var email = new Email();
                expect(email).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a email like parameter', function () {
                var email = new Email();
                email.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(emailResource, 'update').and.returnValue(fakePromise);
                var x = email._update();
                expect(emailResource.update).toHaveBeenCalledWith(email);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a email like parameter', function () {
                var email = new Email();
                email.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(emailResource, 'add').and.returnValue(fakePromise);
                var x = email._add();
                expect(emailResource.add).toHaveBeenCalledWith(email);
            })
        });


    });
})();
