/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.user', ['lanceSolidario.user.userResource']).factory('User', ['userResource', function (userResource) {

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
                return true;
            };
        }

        return User
    }]);
})(angular);

