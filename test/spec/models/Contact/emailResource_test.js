//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

(function () {
    'use strict';

    describe('Email resource', function () {
        var emailResource;
        var httpBackend;
        var promise;
        var scope;
        var apiToken;

        beforeEach(module('lanceSolidario.email.emailResource', 'utils'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('apiToken', {
                    getApiToken: function () {
                        return 'validAccessToken'
                    }
                })
            });

            inject(function (_emailResource_, $httpBackend, $rootScope) {
                httpBackend = $httpBackend;
                emailResource = _emailResource_;
                scope = $rootScope;
            })
        });


        describe('update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId/emails/' + 'validEmailId',{
                    'facebookId': 'validFacebookId',
                    'emailId': 'validEmailId',
                    'email': 'email'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.update({
                    'facebookId': 'validFacebookId',
                    'emailId': 'validEmailId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidFacebookId/emails/' + 'invalidEmailId',{
                    'facebookId': 'invalidFacebookId',
                    'emailId': 'invalidEmailId',
                    'email': 'email'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.update({
                    'facebookId': 'invalidFacebookId',
                    'emailId': 'invalidEmailId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.update({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.update({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


        describe('add', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/validFacebookId/emails',{
                    'facebookId': 'validFacebookId',
                    'email': 'email'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.add({
                    'facebookId': 'validFacebookId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/invalidFacebookId/emails',{
                    'facebookId': 'invalidFacebookId',
                    'email': 'email'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.add({
                    'facebookId': 'invalidFacebookId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.add({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

        describe('remove', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/validFacebookId/emails/' + 'validEmailId').respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.remove({
                    'facebookId': 'validFacebookId',
                    'emailId': 'validEmailId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/invalidFacebookId/emails/' + 'invalidEmailId').respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.remove({
                    'facebookId': 'invalidFacebookId',
                    'emailId': 'invalidEmailId',
                    'email': 'email'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.remove({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.remove({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

        describe('loadEmails', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'validFacebookId/' + 'emails'
                ).respond(200, {emails: [{email: 'email1@gmail.com'}, {email: 'email2@gmail.com'}]});

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.loadEmailsByUser({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve[0].email).toBe('email1@gmail.com');
                    expect(resolve[1].email).toBe('email2@gmail.com');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId/' + 'emails').respond(404, {
                    'message': 'parameters missing.'
                });
                var errorCallback = jasmine.createSpy('errorCallback');

                promise = emailResource.loadEmailsByUser({
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
                promise = emailResource.loadEmailsByUser({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = emailResource.loadEmailsByUser({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });

    });
})();
