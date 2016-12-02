//TODO:Define global variables config
//var globalConfig = {backendBasePath:'http://10.41.1.22:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};

(function () {
    'use strict';

   describe('Address resource', function () {
        var addressResource;
        var httpBackend;
        var promise;
        var scope;
        var apiToken;

        beforeEach(module('lanceSolidario.address.addressResource', 'utils'));

        beforeEach(function () {
            module(function ($provide) {
                $provide.value('apiToken', {
                    getApiToken: function () {
                        return 'validAccessToken'
                    }
                })
            });

            inject(function (_addressResource_, $httpBackend, $rootScope) {
                httpBackend = $httpBackend;
                addressResource = _addressResource_;
                scope = $rootScope;
            })
        });


        describe('update', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/validFacebookId/addresses/' + 'validAddressId',{
                    'facebookId': 'validFacebookId',
                    'addressId': 'validAddressId',
                    'address': 'address'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = addressResource.update({
                    'facebookId': 'validFacebookId',
                    'addressId': 'validAddressId',
                    'address': 'address'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('PUT', globalConfig.backendBasePath + '/users/invalidFacebookId/addresses/' + 'invalidAddressId',{
                    'facebookId': 'invalidFacebookId',
                    'addressId': 'invalidAddressId',
                    'address': 'address'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = addressResource.update({
                    'facebookId': 'invalidFacebookId',
                    'addressId': 'invalidAddressId',
                    'address': 'address'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = addressResource.update({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

            it('should return a rejected promise when not send a token', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = addressResource.update({facebookId: 'validFacebookId'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));
        });


       describe('remove', function () {

           it('should receive a 200', inject(function () {
               httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/validFacebookId/addresses/' + 'validAddressId').respond(200, {
                   facebookId: 'facebookId'
               });

               var errorCallback = jasmine.createSpy('errorCallback');

               promise = addressResource.remove({
                   'facebookId': 'validFacebookId',
                   'addressId': 'validAddressId',
                   'address': 'address'
               });

               httpBackend.flush();

               promise.then(function (resolve) {
                   expect(resolve.facebookId).toBe('facebookId');
               }, errorCallback);
               scope.$digest();
               expect(errorCallback).not.toHaveBeenCalled();
           }));


           it('should get an fail request, request with invalid token/facebookId', inject(function () {
               httpBackend.expect('DELETE', globalConfig.backendBasePath + '/users/invalidFacebookId/addresses/' + 'invalidAddressId').respond(404, {
                   'message': 'parameters missing.'
               });

               var errorCallback = jasmine.createSpy('errorCallback');

               promise = addressResource.remove({
                   'facebookId': 'invalidFacebookId',
                   'addressId': 'invalidAddressId',
                   'address': 'address'
               });

               httpBackend.flush();

               promise.then(function (resolve) {
               }, errorCallback);
               scope.$digest();
               expect(errorCallback).toHaveBeenCalled();
           }));

           it('should return a rejected promise when not send a facebookId', inject(function () {
               var errorCallback = jasmine.createSpy('errorCallback');
               promise = addressResource.remove({token: 'validAccessToken'});
               promise.then(function (resolve) {
                   expect(resolve.errorMessage).toBe('FacebookId missing');
               }, errorCallback);

               scope.$digest();
               expect(errorCallback).toHaveBeenCalled();

           }));

           it('should return a rejected promise when not send a token', inject(function () {
               var errorCallback = jasmine.createSpy('errorCallback');
               promise = addressResource.remove({facebookId: 'validFacebookId'});
               promise.then(function (resolve) {
                   expect(resolve.errorMessage).toBe('FacebookId missing');
               }, errorCallback);
               scope.$digest();
               expect(errorCallback).toHaveBeenCalled();

           }));
       });

        describe('add', function () {

            it('should receive a 200', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/validFacebookId/addresses',{
                    'facebookId': 'validFacebookId',
                    'address': 'address'
                }).respond(200, {
                    facebookId: 'facebookId'
                });

                var errorCallback = jasmine.createSpy('errorCallback');

                promise = addressResource.add({
                    'facebookId': 'validFacebookId',
                    'address': 'address'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                    expect(resolve.facebookId).toBe('facebookId');
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).not.toHaveBeenCalled();
            }));


            it('should get an fail request, request with invalid token/facebookId', inject(function () {
                httpBackend.expect('POST', globalConfig.backendBasePath + '/users/invalidFacebookId/addresses',{
                    'facebookId': 'invalidFacebookId',
                    'address': 'address'
                }).respond(404, {
                    'message': 'parameters missing.'
                });

                var errorCallback = jasmine.createSpy('errorCallback');
                promise = addressResource.add({
                    'facebookId': 'invalidFacebookId',
                    'address': 'address'
                });

                httpBackend.flush();

                promise.then(function (resolve) {
                }, errorCallback);
                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();
            }));

            it('should return a rejected promise when not send a facebookId', inject(function () {
                var errorCallback = jasmine.createSpy('errorCallback');
                promise = addressResource.add({token: 'validAccessToken'});
                promise.then(function (resolve) {
                    expect(resolve.errorMessage).toBe('FacebookId missing');
                }, errorCallback);

                scope.$digest();
                expect(errorCallback).toHaveBeenCalled();

            }));

        });

       describe('loadAddresses', function () {

           it('should receive a 200', inject(function () {
               httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'validFacebookId/' + 'addresses'
               ).respond(200, {'addresses': [{city: 'Curitiba1'}, {city: 'Curitiba2'}]});

               var errorCallback = jasmine.createSpy('errorCallback');

               promise = addressResource.loadAddressesByUser({'facebookId': 'validFacebookId', 'token': 'validAccessToken'});
               httpBackend.flush();

               promise.then(function (resolve) {
                   expect(resolve[0].city).toBe('Curitiba1');
                   expect(resolve[1].city).toBe('Curitiba2');
               }, errorCallback);
               scope.$digest();
               expect(errorCallback).not.toHaveBeenCalled();
           }));


           it('should get an fail request, request with invalid token/facebookId', inject(function () {
               httpBackend.expect('GET', globalConfig.backendBasePath + '/users/' + 'invalidFacebookId/' + 'addresses').respond(404, {
                   'message': 'parameters missing.'
               });
               var errorCallback = jasmine.createSpy('errorCallback');

               promise = addressResource.loadAddressesByUser({
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
               promise = addressResource.loadAddressesByUser({token: 'validAccessToken'});
               promise.then(function (resolve) {
                   expect(resolve.errorMessage).toBe('FacebookId missing');
               }, errorCallback);

               scope.$digest();
               expect(errorCallback).toHaveBeenCalled();

           }));

           it('should return a rejected promise when not send a token', inject(function () {
               var errorCallback = jasmine.createSpy('errorCallback');
               promise = addressResource.loadAddressesByUser({facebookId: 'validFacebookId'});
               promise.then(function (resolve) {
                   expect(resolve.errorMessage).toBe('FacebookId missing');
               }, errorCallback);
               scope.$digest();
               expect(errorCallback).toHaveBeenCalled();

           }));
       });


   });
})();
