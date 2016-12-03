(function () {
    'use strict';

    describe('User entity', function () {
        var User;
        var userResource;
        var $q;
        var rootScope;

        var Address;
        var Email;
        var Telephone;
        var Product;

        beforeEach(module('lanceSolidario.user.user', 'lanceSolidario.user.userResourceMock'));
        beforeEach(inject(function (_userResource_, _User_, _Product_, _Email_, _Telephone_, _Address_, _$q_, _$rootScope_) {
            User = _User_;
            userResource = _userResource_;
            $q = _$q_;
            rootScope = _$rootScope_;
            Product = _Product_;

            Address = _Address_;
            Email = _Email_;
            Telephone = _Telephone_;
            Product = _Product_;

        }));

        describe('new', function () {
            it('should instantiate a User object', inject(function () {
                var user = new User();
                expect(user).toBeDefined();
            }));
        });

        describe('get token', function () {
            it('should call getToken method of resource with a user like parameter', function () {
                var user = new User();
                user.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(userResource, 'getToken').and.returnValue(fakePromise);

                var x = user._updateAPIToken();
                expect(userResource.getToken).toHaveBeenCalledWith(user);
            });
        });

        describe('create or update', function () {

            it('should call createOrUpdate method of resource with a user like parameter', function () {
                var user = new User();
                user.facebookId = 'ThisIdExists';
                user.birthday = new Date();
                var fakePromise = $q.when();
                spyOn(userResource, 'createOrUpdate').and.returnValue(fakePromise);
                var x = user._save();
                expect(userResource.createOrUpdate).toHaveBeenCalledWith(user);
            });
        });

        describe('load', function () {
            it('should call load method of resource with a user like parameter', function () {

                var user = new User();
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve({
                    name: 'TestName', birthday: '08/07/1996'
                });
                spyOn(userResource, 'load').and.returnValue(fakePromise);

                user._load();
                rootScope.$apply();

                expect(userResource.load).toHaveBeenCalledWith(user);
                expect(user.birthday.class).toBe(Date.class);

            });
        });

        describe('load Address list', function () {
            it('should return a array of Address object', function () {

                var user = new User();
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve([
                    {
                        city: 'Araucária',
                        state: 'Paraná'
                    },
                    {
                        city: 'Curitiba',
                        state: 'Paraná'
                    }
                ]);
                spyOn(Address, '_listByUser').and.returnValue(fakePromise);

                user._loadAddresses();
                rootScope.$apply();

                expect(Address._listByUser).toHaveBeenCalledWith(user);
                expect(user.addressList[0].city).toBe('Araucária');
                expect(user.addressList[1].city).toBe('Curitiba');
            });
        });

        describe('load Telephone list', function () {
            it('should return a array of Telephone object', function () {

                var user = new User();
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve([
                    {
                        telephone: '12345678'
                    },
                    {
                        telephone: '87654321'

                    }
                ]);
                spyOn(Telephone, '_listByUser').and.returnValue(fakePromise);

                user._loadTelephones();
                rootScope.$apply();

                expect(Telephone._listByUser).toHaveBeenCalledWith(user);
                expect(user.telephoneList[0].telephone).toBe('12345678');
                expect(user.telephoneList[1].telephone).toBe('87654321');
            });
        });

        describe('load Email list', function () {
            it('should return a array of Email object', function () {

                var user = new User();
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve([
                    {
                        email: 'asd@lol.com'
                    },
                    {
                        email: 'akr@gmail.com'

                    }
                ]);
                spyOn(Email, '_listByUser').and.returnValue(fakePromise);

                user._loadEmails();
                rootScope.$apply();

                expect(Email._listByUser).toHaveBeenCalledWith(user);
                expect(user.emailList[0].email).toBe('asd@lol.com');
                expect(user.emailList[1].email).toBe('akr@gmail.com');
            });
        });


        describe('load Product list', function () {
            it('should return a array of Product object', function () {

                var user = new User();
                user.facebookId = 'ThisIdExists';
                var defer = $q.defer();
                var fakePromise = defer.promise;
                defer.resolve([
                    {
                        productId: '12345678'
                    },
                    {
                        productId: '87654321'
                    }
                ]);
                spyOn(Product, '_listByUser').and.returnValue(fakePromise);

                user._loadProducts();
                rootScope.$apply();

                expect(Product._listByUser).toHaveBeenCalledWith(user);
                expect(user.productList[0].productId).toBe('12345678');
                expect(user.productList[1].productId).toBe('87654321');
            });
        });

        xdescribe('remove', function () {
            it('should test remove method', function () {
                var user = new User();
                expect(user._remove()).toBe(true);
            });
        });

    });
})();
