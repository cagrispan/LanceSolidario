(function () {
    'use strict';

    describe('UserUpdate controller', function () {

        var User;
        var facebookAPI;
        var userUpdateCtrl;
        var location;
        var q;
        beforeEach(module('lanceSolidario'));

        beforeEach(inject(function ($controller, $q) {

            User = function () {
                this._load = function () {
                    return true;
                };
                this._update = function () {
                    return true;
                };
            };
            q = $q;
            facebookAPI = {};

            facebookAPI.user = new User();

            location = {};
            location.path = function (path) {
                return path;
            };
            spyOn(facebookAPI.user, '_load').and.returnValue($q.when({}));

            userUpdateCtrl = $controller('UserUpdate', {
                'User': User,
                'facebookAPI': facebookAPI,
                '$location': location
            });

        }));


        it('should exists', function () {
            expect(userUpdateCtrl).toBeDefined();
        });

        it('should have an saveUser method', function () {
            expect(typeof userUpdateCtrl.saveUser).toBe('function');
        });

        it('should load a user', function () {
            expect(facebookAPI.user._load).toHaveBeenCalled();
        });

        it('should save a user', function () {
            var user = new User();
            spyOn(user,  '_update').and.returnValue(q.when({}));
            userUpdateCtrl.saveUser(user);
            expect(user._update).toHaveBeenCalled();
        });

    });
})();
