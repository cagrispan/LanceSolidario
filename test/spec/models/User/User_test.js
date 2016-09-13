(function () {
    'use strict';

    describe('User entity', function () {
        var User;
        var userResource;
        var $q;

        beforeEach(module('lanceSolidario.user.user', 'lanceSolidario.user.userResourceMock'));
        beforeEach(inject(function (_userResource_, _User_, _$q_) {
            User = _User_;
            userResource = _userResource_;
            $q = _$q_;
        }));

        describe('new', function () {
            it('should instantiate a User object', inject(function () {
                var user = new User();
                expect(user).toBeDefined();
            }));
        });

        describe('_updateAPIToken', function () {
            it('should call add method of resource with a user like parameter', function () {
                var user = new User();
                user.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(userResource, 'getToken').and.returnValue(fakePromise);

                var x = user._updateAPIToken();
                expect(userResource.getToken).toHaveBeenCalledWith(user);
            });
        });

        describe('save', function () {
            it('should save a user', function () {
                var user = new User();
            });
        });


        describe('remove', function () {
            it('should test remove method', function () {
                var user = new User();
                expect(user._remove()).toBe(true);
            });
        });

        describe('update', function () {

            it('should call update method of resource with a user like parameter', function () {
                var user = new User();
                user.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(userResource, 'update').and.returnValue(fakePromise);
                var x = user._update();
                expect(userResource.update).toHaveBeenCalledWith(user);
            });
        });

        describe('load', function () {
            it('should test load method', function () {
                var user = new User();
                expect(user._load()).toBe(true);
            });
        });

    });
})();
