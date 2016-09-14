/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.user', ['lanceSolidario.user.userResource', 'lanceSolidario.address.address']).factory('User', ['userResource','Entity','Address', function (userResource, Entity, Address) {

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
             Object Address
             */
            this.address = null;

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

            this._update = function () {
                return userResource.update(this);
            };

            this._remove = function () {
                return true;
            };

            this._load = function () {
                var user = this;
                return userResource.load(user).then(
                    function (userReturned) {
                        user._set(userReturned);

                        //Special map
                        user.birthday = new Date(user.birthday);

                        var address = new Address();
                        address._set(user.address);
                        user.address = address;
                        return this;
                    },
                    function (errorCallback) {
                        return errorCallback;

                    });
            };
        }

        return User
    }]);
})(angular);

