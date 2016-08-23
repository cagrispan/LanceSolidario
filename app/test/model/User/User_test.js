
(function () {
    'use strict';

    describe('User entity', function () {
        var User;
        var userResource;

        beforeEach(module('lanceSolidario.user.user','lanceSolidario.user.userResourceMock'));
        beforeEach(inject(function (_userResource_,_User_) {
            User = _User_;
            userResource = _userResource_;
        }));

        describe('new', function () {
            it('should instantiate a User object', inject(function () {
                var user = new User();
                expect(user).toBeDefined();
            }));
        });

        describe('add', function () {
            it('should add a user', function () {
                var user = new User();
                user.facebookId = 'ThisIdExists';
                var x  = user._add();
                expect(x).toBe(22);
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
                expect(user._remove()).toBe(false);
            });
        });

        describe('update', function () {
            it('should get a resolved promise with a user send', function () {
                var user = new User();
                user.facebookId = 'validFacebookId';
                user.token = 'validToken';
                var promise  = user._save();
                promise.then(function(resolve){
                    expect(resolve.user.name).toBe('userTestName');
                });
            });

            it('should get a reject promise when send a empty user object', function () {
                var user = new User();
                var promise  = user._save();

                promise.then(function(resolve){
                    expect(true).toBe(false);
                },function(resolve){
                    expect(resolve).toBe(true);
                })

            });
        });

        describe('load', function () {
            it('should test load method', function () {
                var user = new User();
                expect(user._load()).toBe(false);
            });
        });

    });
})();