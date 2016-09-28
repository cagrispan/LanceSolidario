/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.user', ['lanceSolidario.user.userResource', 'lanceSolidario.address.address', 'lanceSolidario.telephone.telephone', 'lanceSolidario.email.email', 'lanceSolidario.product.product']).factory('User', ['userResource', 'Entity', 'Address', 'Email', 'Telephone','Product', function (userResource, Entity, Address, Email, Telephone, Product) {

        angular.extend(User.prototype, Entity.prototype);
        User.prototype.constructor = User;

        function User() {

            //identification
            this.facebookId = null;
            this.facebookToken = null;
            this.token = null;

            //personal info
            this.name = null;
            this.birthday = null;

            //contact
            this.email = null;
            this.phone = null;

            /*
             Array Object Address
             */
            this.addressList = null;

            /*
             Array Object Telephone
             */
            this.telephoneList = null;

            /*
             Array Object Email
             */
            this.emailList = null;

            //products
            this.products = null;

            //purchases
            this.purchases = null;
            this.bids = null;


            //Method
            //If not exist, create a new user
            this._updateAPIToken = function () {
                var user = this;
                return userResource.getToken(user).then(function (resolve) {
                    if (resolve.token) {
                        user.token = resolve.token;
                    }
                })
            };

            this._getToken = function () {
                return this.token;
            };


            this._remove = function () {
                return true;
            };

            this._load = function () {
                var user = this;
                var loadUserPromise = userResource.load(user);
                return loadUserPromise
                    .then(function (userReturned) {
                        user._set(userReturned);
                        user.birthday = new Date(user.birthday);
                        return user;
                    });
            };

            this._save = function () {
                var user = this;
                return userResource.createOrUpdate(user);
            };


            this._loadAddresses = function () {
                var user = this;
                return userResource.loadAddresses(user)
                    .then(function (addressList) {
                        if (addressList && addressList[0]) {
                            var address;
                            user.addressList = [];
                            for (var i in addressList) {
                                address = new Address();
                                address._set(addressList[i]);
                                address.facebookId = user.facebookId;
                                user.addressList.push(address);
                            }
                        }
                        return user;
                    })
            };

            this._loadEmails = function () {
                var user = this;
                return userResource.loadEmails(user)
                    .then(function (emailList) {
                        if (emailList && emailList[0]) {
                            var email;
                            user.emailList = [];
                            for (var i in emailList) {
                                email = new Email();
                                email._set(emailList[i]);
                                email.facebookId = user.facebookId;
                                user.emailList.push(email);
                            }
                        }
                        return user;
                    })
            };


            this._loadTelephones = function () {
                var user = this;
                return userResource.loadTelephones(user)
                    .then(function (telephonesList) {
                        if (telephonesList && telephonesList[0]) {
                            var telephone;
                            user.telephoneList = [];
                            for (var i in telephonesList) {
                                telephone = new Telephone();
                                telephone._set(telephonesList[i]);
                                telephone.facebookId = user.facebookId;
                                user.telephoneList.push(telephone);
                            }
                        }
                        return user;
                    });
            };

            this._loadProducts = function () {
                var user = this;
                return userResource.loadProducts(user)
                    .then(function (productsList) {
                        if (productsList && productsList[0]) {
                            var product;
                            user.productList = [];
                            for (var i in productsList) {
                                product = new Product();
                                product._set(productsList[i]);
                                product.facebookId = user.facebookId;
                                user.productList.push(product);
                            }
                        }
                        return user;
                    });
            };

            this._loadAll = function () {
                var user = this;
                return user._load()
                    .then(user._loadAddresses())
                    .then(user._loadEmails())
                    .then(user._loadTelephones());
            }
        }

        return User
    }

    ])
    ;
})
(angular);

