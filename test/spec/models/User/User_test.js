(function () {
    'use strict';

    describe('User entity', function () {
        var User;
        var userResource;
        var $q;
        var Address;
        var rootScope;

        beforeEach(module('lanceSolidario.user.user', 'lanceSolidario.user.userResourceMock'));
        beforeEach(inject(function (_userResource_, _User_, _$q_, _$rootScope_) {
            User = _User_;
            userResource = _userResource_;
            $q = _$q_;
            rootScope = _$rootScope_;

            Address = function(){
                this.city = null;
                this.complement = null;
                this.zip = null;
                this._set = function(address){
                    this.city = address.city;
                    this.complement = address.complement;
                    this.zip = address.zip;
                }
            }
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
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve({
                    name: 'TestName', birthday: '08/07/1996', address: {
                        addressLine: 'addressLineTest',
                        city: 'cityTest',
                        complement: 'complementTest',
                        state: 'stateTest',
                        zip: 'zip Test'
                    }
                });
                spyOn(userResource, 'load').and.returnValue(fakePromise);

                user._load();
                rootScope.$apply();

                expect(userResource.load).toHaveBeenCalledWith(user);
                expect(user.address.city).toBe('cityTest');
                expect(user.birthday.class).toBe(Date.class);

            });
        });

    });
})();
