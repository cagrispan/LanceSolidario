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

        describe('get token', function () {

            it('should get an token sending a valid and registered facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/auth').respond(200, {
                    token: 'tokenTest'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.getToken({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.token).toBe('tokenTest');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/auth').respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.getToken({'facebookId': 'invalidFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = userResource.getToken({});
                promise.then(function (resolve) {
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('create or update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/' + 'validFacebookId', {
                    facebookId: 'validFacebookId',
                    token: 'validAccessToken'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.createOrUpdate({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId', {
                    facebookId: 'invalidFacebookId',
                    token: 'invalidAccessToken'
                }).respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.createOrUpdate({
                    'facebookId': 'invalidFacebookId',
                    'token': 'invalidAccessToken'
                });
                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = userResource.createOrUpdate({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = userResource.createOrUpdate({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('load', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'validFacebookId'
                ).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.load({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId').respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = userResource.load({
                    'facebookId': 'invalidFacebookId',
                    'token': 'invalidAccessToken'
                });
                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = userResource.load({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = userResource.load({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

    });
})();
