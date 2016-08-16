/**
 * Created by Aliss on 11/08/2016.
 */
(function () {
    'use strict';

    describe('User resource', function () {
        var userResource;
        var httpBackend;
        var promise;
        var scope;

        beforeEach(module('lanceSolidario.user.userResource'));
        beforeEach(inject(function (_userResource_, $httpBackend, $rootScope) {
            httpBackend = $httpBackend;
            userResource = _userResource_;
            scope = $rootScope;
        }));

        describe('save a user object', function () {
            beforeEach(function () {
                httpBackend.expect("PUT",globalConfig.backendBasePath+"/users/validFacebookId/token/validToken").respond(200, {name:'userTestName',facebookId: 'validId'});
                promise = userResource.save({'facebookId': 'validFacebookId','token':'validToken'});
                httpBackend.flush();
            });

            it('should get an object with facebookId', inject(function () {
                promise.then(function (resolve) {
                    expect(resolve.name).toBe('userTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));
        });
    });
})();