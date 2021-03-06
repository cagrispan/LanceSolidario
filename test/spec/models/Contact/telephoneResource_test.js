//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

(function () {
    'use strict';

    describe('Telephone resource', function () {
        var telephoneResource;
        var httpBackend;
        var promise;
        var scope;
        var apiToken;

        beforeEach(module('lanceSolidario.telephone.telephoneResource', 'utils'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('apiToken', {
                    getApiToken: function () {
                        return 'validAccessToken'
                    }
                })
            });

            inject(function (_telephoneResource_, $httpBackend, $rootScope) {
                httpBackend = $httpBackend;
                telephoneResource = _telephoneResource_;
                scope = $rootScope;
            })
        });


        describe('update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId/telephones/' + 'validTelephoneId',{
                    'facebookId': 'validFacebookId',
                    'telephoneId': 'validTelephoneId',
                    'telephone': 'telephone'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.update({
                    'facebookId': 'validFacebookId',
                    'telephoneId': 'validTelephoneId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidFacebookId/telephones/' + 'invalidTelephoneId',{
                    'facebookId': 'invalidFacebookId',
                    'telephoneId': 'invalidTelephoneId',
                    'telephone': 'telephone'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.update({
                    'facebookId': 'invalidFacebookId',
                    'telephoneId': 'invalidTelephoneId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.update({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.update({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('add', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/validFacebookId/telephones',{
                    'facebookId': 'validFacebookId',
                    'telephone': 'telephone'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.add({
                    'facebookId': 'validFacebookId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/invalidFacebookId/telephones',{
                    'facebookId': 'invalidFacebookId',
                    'telephone': 'telephone'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.add({
                    'facebookId': 'invalidFacebookId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.add({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

        describe('remove', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/validFacebookId/telephones/' + 'validTelephoneId').respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.remove({
                    'facebookId': 'validFacebookId',
                    'telephoneId': 'validTelephoneId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/invalidFacebookId/telephones/' + 'invalidTelephoneId').respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.remove({
                    'facebookId': 'invalidFacebookId',
                    'telephoneId': 'invalidTelephoneId',
                    'telephone': 'telephone'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.remove({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.remove({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

        describe('loadTelephones', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'validFacebookId/' + 'telephones'
                ).respond(200, {telephones: [{telephone: '12345678'}, {telephone: '87655598'}]});

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.loadTelephonesByUser({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve[0].telephone).toBe('12345678');
                    expect(resolve[1].telephone).toBe('87655598');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId/' + 'telephones').respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = telephoneResource.loadTelephonesByUser({
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
                promise = telephoneResource.loadTelephonesByUser({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = telephoneResource.loadTelephonesByUser({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

    });
})();
