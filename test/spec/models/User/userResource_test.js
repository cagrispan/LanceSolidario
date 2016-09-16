//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

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

            it('should get an object with facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/auth/validFacebookId').respond(200, {
                    name: 'userTestName',
                    facebookId: 'validId'
                });
                promise = userResource.getToken({'facebookId': 'validFacebookId', 'token': 'validToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.name).toBe('userTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request, request without token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/auth/invalidId').respond(404, {
                    'message': 'parameters missing.'
                });
                promise = userResource.getToken({'facebookId': 'invalidId'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(true).toBe(false);
                }, function (resolve) {
                    expect(resolve.message).toBe('parameters missing.');
                });
                scope.$digest();
            }));
        });

        describe('update a user object', function () {

            it('should get an object with facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId').respond(200, {
                    name: 'userTestName',
                    facebookId: 'validId'
                });
                promise = userResource.update({'facebookId': 'validFacebookId', 'token': 'validToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.name).toBe('userTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request, request without token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidId').respond(404, {
                    'message': 'parameters missing.'
                });
                promise = userResource.update({'facebookId': 'invalidId'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(true).toBe(false);
                }, function (resolve) {
                    expect(resolve.message).toBe('parameters missing.');
                });
                scope.$digest();
            }));
        });

        describe('load a user object', function () {

            it('should get an object with facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId').respond(200, {
                    name: 'userTestName',
                    facebookId: 'validId'
                });
                promise = userResource.update({'facebookId': 'validFacebookId', 'token': 'validToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.name).toBe('userTestName');
                }, function (resolve) {
                    expect(true).toBe(false);
                });
                scope.$digest();
            }));

            it('should get an fail request, request without token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidId').respond(404, {
                    'message': 'parameters missing.'
                });
                promise = userResource.update({'facebookId': 'invalidId'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(true).toBe(false);
                }, function (resolve) {
                    expect(resolve.message).toBe('parameters missing.');
                });
                scope.$digest();
            }));
        });
    });
})();
