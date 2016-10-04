/**
 * Created by Carlos on 28/07/2016.
 */
(function (angular) {
    'use strict';

    angular.module('lanceSolidario.address.address',['lanceSolidario.address.addressResource']).factory('Address',['Entity','addressResource', function (Entity, addressResource) {

        angular.extend(Address.prototype, Entity.prototype);
        Address.prototype.constructor = Address;

        function Address() {

            this.addressId = null;
            this.facebookId = null;
            this.addressLine = null;
            this.city = null;
            this.complement = null;
            this.state = null;
            this.zip = null;

            this._add = function(){
                return addressResource.add(this);
            };

            this._update = function(){
                return addressResource.update(this);
            };

            this._remove = function(){
                return addressResource.remove(this);
            }

        }

        return Address;
    }]);

})(angular);
