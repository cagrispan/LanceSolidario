/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.user', ['lanceSolidario.user.userResource']).factory('User', ['userResource', function (userResource) {

        User.prototype.constructor = User;

        function User() {

            //identification
            this.id = null;
            this.facebookId = null;
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
            this._add = function () {
                return userResource.add(this);
            };
            this._save = function () {
                return userResource.save(this);
            };
            this._update = function () {
                return true;
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

