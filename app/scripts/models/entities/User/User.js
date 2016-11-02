/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.user', ['lanceSolidario.user.userResource', 'lanceSolidario.address.address', 'lanceSolidario.telephone.telephone', 'lanceSolidario.email.email', 'lanceSolidario.product.product', 'lanceSolidario.bid.bid']).factory('User', ['userResource', 'Entity', 'Address', 'Email', 'Telephone', 'Product', 'Bid', function (userResource, Entity, Address, Email, Telephone, Product, Bid) {

        angular.extend(User.prototype, Entity.prototype);
        User.prototype.constructor = User;

        function User() {

            //identification
            this.facebookId = null;
            this.facebookToken = null;
            this.profilePicture = null;
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

            /*
             Array Object product
             */
            this.productList = null;

            /*
             Array Object purchase
             */
            this.purchases = null;

            /*
             Array Object bids
             */
            this.bidList = null;


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

            this._loadPublicInformation = function () {
                var user = this;
                var loadUserPromise = userResource.loadPublicInformation(user);
                return loadUserPromise
                    .then(function (userReturned) {
                        user._set(userReturned);
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
                        user.addressList = [];
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
                        user.emailList = [];
                        if (emailList && emailList[0]) {
                            var email;
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
                        user.telephoneList = [];
                        if (telephonesList && telephonesList[0]) {
                            var telephone;
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
                        user.productList = [];
                        if (productsList && productsList[0]) {
                            var product;
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

            //TODO: Need Unit tests
            this._loadBids = function () {
                var user = this;
                var bid = new Bid();
                return bid._listByUser(user).then(function (returnList) {
                    user.bidList = returnList;
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

